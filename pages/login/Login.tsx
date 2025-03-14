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
import { Link } from "@/i18n/navigation";
import { Eye, EyeClosed } from "lucide-react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

// ----------------------------------------------------------------------

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const t = useTranslations();

  const formSchema = z.object({
    username: z.string().min(1, {
      message: t("login.username.request"),
    }),
    password: z.string().min(1, {
      message: t("login.password.request"),
    }),
    captcha: z.string().min(1, {
      message: t("login.captcha.request"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      captcha: "",
    },
  });

  const handleCaptcha = async () => {
    loadCaptchaEnginge(6, "#0e7490", "white");
  };
  React.useEffect(() => {
    handleCaptcha();
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    validateCaptcha(values.captcha);
    console.log(validateCaptcha(values.captcha));
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
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
          name="captcha"
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
                  <div
                    onClick={handleCaptcha}
                    className="border max-w-1/2 cursor-pointer bg-cyan-700 flex-1/2 h-[36px] flex justify-center items-center rounded-md"
                  >
                    <LoadCanvasTemplateNoReload reloadColor="red" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer bg-sky-500 hover:bg-sky-600"
        >
          {t("login.title")}
        </Button>
      </form>
    </Form>
  );
};
export default Login;
