"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Eye, EyeClosed, LoaderIcon } from "lucide-react";
import { loginService } from "@/api/user/login/login.service";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";
import { updateUser } from "@/lib/features/user";

// ----------------------------------------------------------------------

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = React.useState<boolean>(true);
  const t = useTranslations();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const formSchema = z.object({
    userName: z.string().min(1, {
      message: t("login.username.request"),
    }),
    password: z.string().min(1, {
      message: t("login.password.request"),
    }),
    captchaCode: z.string().min(4, {
      message: t("login.captcha.request"),
    }),
    captchaId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
      captchaCode: "",
      captchaId: "",
    },
  });

  const getCaptcha = async () => {
    try {
      setIsLoading(true);
      const res = await loginService.getCaptcha();
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
      setIsLoadingSubmit(true);
      const res = await loginService.login(values);
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
        setIsLoadingSubmit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("login.username.title")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("login.username.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between gap-5">
                <FormLabel>{t("login.password.title")}</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-sky-500 hover:text-sky-600 text-end"
                >
                  {t("login.password.forgot")}
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={t("login.password.placeholder")}
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

        <Button
          type="submit"
          className="w-full cursor-pointer bg-sky-500 hover:bg-sky-600"
          disabled={isLoading || isLoadingSubmit}
        >
          {t("login.title")}
        </Button>
      </form>
    </Form>
  );
};
export default Login;
