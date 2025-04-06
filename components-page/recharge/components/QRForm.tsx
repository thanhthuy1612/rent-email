import { ISearch } from "@/components-page/recharge/History";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionStatus, TransactionType } from "@/enums/enum";
import { dateFormat } from "@/lib/useTime";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ----------------------------------------------------------------------

export interface IQRFormProps {
  value: ISearch;
  handleSubmit: (value: ISearch) => void;
}
const QRForm: React.FC<IQRFormProps> = ({ value, handleSubmit }) => {
  const t = useTranslations();

  const formSchema = z
    .object({
      dateFrom: z.date().max(new Date(), {
        message: t("recharge.date.error1"),
      }),
      dateTo: z.date().max(new Date(), {
        message: t("recharge.date.error1"),
      }),
      types: z.array(z.number()),
      statuses: z.array(z.number()),
    })
    .superRefine((data, ctx) => {
      if (data.dateTo <= data.dateFrom) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("recharge.date.error2"),
          path: ["dateTo"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateFrom: value.from,
      dateTo: value.to,
      types: value.types,
      statuses: value.statuses,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      handleSubmit({
        from: values.dateFrom,
        to: values.dateTo,
        types: values.types,
        statuses: values.statuses,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="dateFrom"
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
            name="dateTo"
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

          <Button
            type="submit"
            className="w-full mt-5.5 cursor-pointer bg-sky-500 hover:bg-sky-600"
          >
            {t("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QRForm;
