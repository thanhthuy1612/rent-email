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

export interface TPartnerForm {
  name: string;
  apiKey: string;
  baseUrl: string;
  configurations: string;
  priority: number;
  isDeleted: boolean;
}
export interface IPartnerFormProps {
  data: TPartnerForm;
  handleSubmit: () => void;
}
const PartnerForm: React.FC<IPartnerFormProps> = ({ data, handleSubmit }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const t = useTranslations();

  const formSchema = z.object({
    name: z.string().min(1),
    apiKey: z.string().min(1),
    baseUrl: z.string().min(1),
    configurations: z.string().min(1),
    priority: z.number(),
    isDeleted: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      apiKey: data.apiKey,
      baseUrl: data.baseUrl,
      configurations: data.configurations,
      priority: data.priority,
      isDeleted: data.isDeleted,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await managerService.updatePartner(values);
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
              <FormLabel>{t("partner.name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("partner.name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("partner.key")}</FormLabel>
              <FormControl>
                <Input placeholder={t("partner.key")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="baseUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("partner.baseUrl")}</FormLabel>
              <FormControl>
                <Input placeholder={t("partner.baseUrl")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="configurations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("partner.configurations")}</FormLabel>
              <FormControl>
                <Input placeholder={t("partner.configurations")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("partner.priority")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("partner.priority")}
                  {...field}
                />
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
          {t("search")}
        </Button>
      </form>
    </Form>
  );
};

export default PartnerForm;
