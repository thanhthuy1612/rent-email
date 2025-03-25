"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Eye, EyeClosed, LoaderIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { registerService } from "@/api/user/register/register.service";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";
import { updateUser } from "@/lib/features/user";

// ----------------------------------------------------------------------

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const t = useTranslations();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const formSchema = z
    .object({
      username: z
        .string()
        .min(6, { message: t("register.username.error1") })
        .max(20, { message: t("register.username.error2") })
        .regex(/^[a-zA-Z0-9]+$/, {
          message: t("register.username.error3"),
        }),
      email: z
        .string()
        .email({ message: t("register.email.error1") })
        .min(5, { message: t("register.email.error1") }),
      password: z
        .string()
        .min(6, { message: t("register.password.error1") })
        .max(18, { message: t("register.password.error2") })
        .refine((value) => /[A-Za-z]/.test(value), {
          message: t("register.password.error3"),
        })
        .refine((value) => /\d/.test(value), {
          message: t("register.password.error4"),
        })
        .refine(
          (value) =>
            /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]+$/.test(value),
          {
            message: t("register.password.error5"),
          }
        ),
      rePassword: z
        .string()
        .min(6, { message: t("register.rePassword.error1") })
        .max(18, { message: t("register.rePassword.error2") })
        .refine((value) => /[A-Za-z]/.test(value), {
          message: t("register.rePassword.error3"),
        })
        .refine((value) => /\d/.test(value), {
          message: t("register.rePassword.error4"),
        })
        .refine(
          (value) =>
            /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]+$/.test(value),
          {
            message: t("register.rePassword.error5"),
          }
        ),
      captchaCode: z.string().min(4, {
        message: t("login.captcha.request"),
      }),
      captchaId: z.string(),
      term: z.boolean().refine((value) => value === true, {
        message: t("register.term.error"),
      }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.rePassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("register.rePassword.error6"),
          path: ["rePassword"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rePassword: "",
      term: false,
      captchaCode: "",
      captchaId: "",
      email: "",
    },
  });

  const getCaptcha = async () => {
    try {
      setIsLoading(true);
      const res = await registerService.getCaptcha();
      if (!res.code) {
        const data = res.data;
        const imageData = `data:image/jpeg;base64,${data.base64}`;
        setImage(imageData);
        form.setValue("captchaId", data.captchaId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      form.setValue("captchaCode", "");
    }
  };

  React.useEffect(() => {
    getCaptcha();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await registerService.register({
        userName: values.username,
        password: values.password,
        captchaId: values.captchaId,
        captchaCode: values.captchaCode,
        email: values.email,
      });
      if (!res.code) {
        toast({
          title: t("alert.success"),
          description: t("login.alert-success"),
          duration: 10000,
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch(updateUser(res.data));
        router.push("/user");
      } else {
        toast({
          title: t("alert.error"),
          description: res.message,
          variant: "destructive",
          duration: 10000,
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white"
          ),
        });
        getCaptcha();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.username.title")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("register.username.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {t("register.username.description")}
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.email.title")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("register.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                {t("register.email.description")}
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.password.title")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={t("register.password.placeholder")}
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                  <Button
                    className="absolute top-0 right-0"
                    type="button"
                    onClick={() => {
                      setShowPassword((pre) => !pre);
                    }}
                    variant="link"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>
                <ul className="list-disc ml-3.5">
                  <li>{t("register.password.request1")}</li>
                  <li>{t("register.password.request2")}</li>
                  <li>{t("register.password.request3")}</li>
                </ul>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.rePassword.title")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={t("register.rePassword.placeholder")}
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                  <Button
                    className="absolute top-0 right-0"
                    type="button"
                    onClick={() => {
                      setShowPassword((pre) => !pre);
                    }}
                    variant="link"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="captchaCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("login.captcha.title")}</FormLabel>
              <FormControl>
                <div className="flex gap-3">
                  <Input
                    placeholder={t("login.captcha.placeholder")}
                    className="flex-1/2 max-w-1/2"
                    {...field}
                  />
                  {image && !isLoading ? (
                    <div
                      onClick={getCaptcha}
                      className="flex-1/2 max-w-1/2 border-1 rounded-md overflow-auto"
                    >
                      <Image
                        src={image}
                        className="w-full h-[35px]"
                        alt="captcha"
                        width={500}
                        height={36}
                      />
                    </div>
                  ) : (
                    <div className="flex-1/2 flex justify-center items-center max-w-1/2 border-1 rounded-md overflow-auto bg-neutral-950">
                      <LoaderIcon className="rotate text-white" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>
                  {t("register.term.title")}
                  <Link
                    href="/term"
                    className="text-sky-500 hover:text-sky-600 cursor-pointer"
                  >
                    {t("register.term.link")}
                  </Link>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full mt-3 cursor-pointer bg-sky-500 hover:bg-sky-600"
        >
          {t("register.title")}
        </Button>
      </form>
    </Form>
  );
};
export default Register;
