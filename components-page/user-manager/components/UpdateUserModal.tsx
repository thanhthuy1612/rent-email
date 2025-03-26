import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface IUpdateUserModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const UpdateUserModal: React.FC<IUpdateUserModalProps> = ({
  userId,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const t = useTranslations();

  const formSchema = z.object({
    setPassword: z
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
    creditBalance: z.coerce.number().min(0, t("validation.min", { min: 0 })),
    debitBalance: z.coerce.number().min(0, t("validation.min", { min: 0 })),
    setStatus: z.enum(["1", "2", "3"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      setPassword: "",
      creditBalance: 0,
      debitBalance: 0,
      setStatus: "1",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      onSubmit({ userId, ...values });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("updateUser.title")}</DialogTitle>
          <DialogDescription>{t("updateUser.description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="setPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("updateUser.setPassword")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creditBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("updateUser.creditBalance")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="debitBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("updateUser.debitBalance")}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="setStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("updateUser.setStatus")}</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded-md p-2">
                      <option value="1">{t("status.active")}</option>
                      <option value="2">{t("status.inactive")}</option>
                      <option value="3">{t("status.suspended")}</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{t("updateUser.submit")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
