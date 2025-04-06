import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { managerService } from "@/api/user/manager/manager.service";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

// ----------------------------------------------------------------------

export interface TServiceForm {
  name: string;
  price: number;
  discount: number;
  description: string;
  partnerName: string;
  isDeleted: boolean;
}
export interface IServiceFormProps {
  data: TServiceForm;
  handleSubmit: () => void;
}
const ServiceForm: React.FC<IServiceFormProps> = ({ data, handleSubmit }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const t = useTranslations();

  const formSchema = z.object({
    name: z.string().min(1, { message: t("validation.required") }),
    price: z.number().min(1, { message: t("validation.min") }),
    discount: z.number(),
    description: z.string().min(1, { message: t("validation.required") }),
    partnerName: z.string(),
    isDeleted: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      price: data.price,
      discount: data.discount,
      description: data.description,
      partnerName: data.partnerName,
      isDeleted: data.isDeleted,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await managerService.updateService(values);
      if (!res.code) {
        toast({
          title: t("alert.success"),
          description: res.message,
          duration: 10000,
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      handleSubmit();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("service.name")}</FormLabel>
              <FormControl>
                <Input disabled placeholder={t("service.name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("service.price")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("service.price")}
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? "" : value); // Gửi giá trị số, nếu không hợp lệ thì gửi chuỗi rỗng
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("service.discount")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("service.discount")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("service.description")}</FormLabel>
              <FormControl>
                <Input placeholder={t("service.description")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partnerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("service.partnerName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("service.partnerName")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDeleted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t("service.isDeleted")}</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full mt-5.5 cursor-pointer bg-sky-500 hover:bg-sky-600"
        >
          {t("changePassword.send")}
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;
