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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
