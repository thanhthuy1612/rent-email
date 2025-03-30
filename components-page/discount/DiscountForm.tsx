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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { dateFormat } from "@/lib/useTime";

// ----------------------------------------------------------------------

export interface TDiscountForm {
  promotion: number;
  startTime: Date;
  endTime: Date;
  isDeleted: boolean;
}
export interface IDiscountFormProps {
  data: TDiscountForm;
  handleSubmit: () => void;
}
const DiscountForm: React.FC<IDiscountFormProps> = ({ data, handleSubmit }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const t = useTranslations();

  const formSchema = z
    .object({
      promotion: z.number(),
      startTime: z.date().max(new Date(), {
        message: t("recharge.date.error1"),
      }),
      endTime: z.date().max(new Date(), {
        message: t("recharge.date.error1"),
      }),
      isDeleted: z.boolean(),
    })
    .superRefine((data, ctx) => {
      if (data.endTime < data.startTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ngày đến phải lớn hơn ngày từ",
          path: ["dateTo"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promotion: data.promotion,
      startTime: data.startTime,
      endTime: data.endTime,
      isDeleted: data.isDeleted,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await managerService.updateDiscount(values);
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
          name="promotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promotion</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Promotion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("recharge.fromDate")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        dateFormat(field.value)
                      ) : (
                        <span>{t("recharge.choose")}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("recharge.fromDate")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        dateFormat(field.value)
                      ) : (
                        <span>{t("recharge.choose")}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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

export default DiscountForm;
