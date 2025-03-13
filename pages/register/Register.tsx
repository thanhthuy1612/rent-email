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
import { Eye, EyeClosed } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/navigation";

// ----------------------------------------------------------------------

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const t = useTranslations();

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
      code: z.string(),
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
      email: "",
      password: "",
      rePassword: "",
      code: "",
      term: false,
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("register.code.title")}{" "}
                <span className="text-red-600 italic font-light text-[10px]">
                  * không bắt buộc
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("register.code.placeholder")}
                  {...field}
                />
              </FormControl>
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
