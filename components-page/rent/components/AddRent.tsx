import { keyService } from "@/api/key/key.service";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ----------------------------------------------------------------------

export interface IAddRentFormProps {
  listServices: any[];
  resetPage: () => void;
}
const AddRentForm: React.FC<IAddRentFormProps> = ({
  listServices,
  resetPage,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const t = useTranslations();
  const { apiToken } = useAppSelector((item) => item.user);

  const formSchema = z.object({
    services: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      try {
        setIsLoading(true);
        const res = await keyService.getNewEmail({
          serviceName: values.services,
          key: apiToken ?? "",
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
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        resetPage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className=" col-span-1 md:col-span-4">
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("recharge.services.title")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t("recharge.services.placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {listServices.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full button-color "
          >
            {t("rent.addNew")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddRentForm;
