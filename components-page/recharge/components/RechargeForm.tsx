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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ISearch } from "@/components-page/recharge/History";

// ----------------------------------------------------------------------

export interface IRechargeFormProps {
  value: ISearch;
  handleSubmit: (value: ISearch) => void;
}
const RechargeForm: React.FC<IRechargeFormProps> = ({
  value,
  handleSubmit,
}) => {
  const t = useTranslations();

  const listType = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
  ];
  const listStatus = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
  ];

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
          message: "Ngày đến phải lớn hơn ngày từ",
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                          format(field.value, "PPP")
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
                          format(field.value, "PPP")
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
            name="types"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recharge.types.title")}</FormLabel>
                <Select
                  onValueChange={(event) => {
                    const arrays = form.getValues("types");
                    if (arrays.includes(Number(event))) {
                      form.setValue(
                        "types",
                        arrays.filter((item) => item !== Number(event))
                      );
                    } else {
                      form.setValue("types", [...arrays, Number(event)]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("recharge.types.placeholder")}
                      >
                        {field.value.length === 1
                          ? listStatus.find(
                              (item) => item.id === field.value[0]
                            )?.value
                          : `${field.value.length} ${t("selected")}`}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listStatus.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        <Checkbox checked={field.value.includes(item.id)} />
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="statuses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recharge.statuses.title")}</FormLabel>
                <Select
                  onValueChange={(event) => {
                    const arrays = form.getValues("statuses");
                    if (arrays.includes(Number(event))) {
                      form.setValue(
                        "statuses",
                        arrays.filter((item) => item !== Number(event))
                      );
                    } else {
                      form.setValue("statuses", [...arrays, Number(event)]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("recharge.statuses.placeholder")}
                      >
                        {field.value.length === 1
                          ? listType.find((item) => item.id === field.value[0])
                              ?.value
                          : `${field.value.length} ${t("selected")}`}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listType.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        <Checkbox checked={field.value.includes(item.id)} />
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-5.5 cursor-pointer bg-sky-500 hover:bg-sky-600"
          >
            {t("search")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RechargeForm;
