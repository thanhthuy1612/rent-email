"use client";

import axiosLocal from "@/api/axiosLocal";
import { changeService } from "@/api/user/change/change.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChangePassword: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = React.useState<boolean>(false);

  const t = useTranslations();
  const router = useRouter();

  const formSchema = z
    .object({
      oldPassword: z.string().min(1),
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
      oldPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoadingSubmit(true);
      const res = await changeService.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.password,
        confirmPassword: values.rePassword,
      });
      if (!res.code) {
        toast({
          title: t("alert.success"),
          description: res.message,
          duration: 10000,
          className: cn(
            "top-0 right-0 flex fixed max-w-1/2 md:max-w-[420px] top-4 right-4"
          ),
        });
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        delete axiosLocal.defaults.headers.common.Authorization;
        router.push("/login");
      } else {
        toast({
          title: t("alert.error"),
          description: res.message,
          variant: "destructive",
          duration: 10000,
          className: cn(
            "top-0 right-0 flex fixed max-w-1/2 md:max-w-[420px] top-4 right-4 text-white"
          ),
        });
        setIsLoadingSubmit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="p-5 mx-5">
      <CardHeader className="m-5 mb-0 pb-9 border-b-1">
        <CardTitle className="text-center">
          {t("changePassword.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mb-10"
          >
            <FormField
              control={form.control}
              name="oldPassword"
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
            <Button
              type="submit"
              disabled={isLoadingSubmit}
              className="w-full mt-3 button-color"
            >
              {t("changePassword.send")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
