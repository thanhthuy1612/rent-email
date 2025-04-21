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
import { ISearch } from "@/components-page/rent/Rent";
import { dateFormat } from "@/lib/useTime";
import { RequestStatus } from "@/enums/enum";

// ----------------------------------------------------------------------

export interface IRentFormProps {
  value: ISearch;
  handleSubmit: (value: ISearch) => void;
  listServices: any[];
}

const RentForm: React.FC<IRentFormProps> = ({
  value,
  handleSubmit,
  listServices,
}) => {
  const t = useTranslations();

  const listType = [
    { id: RequestStatus.Cancel, value: "Huỷ" },
    { id: RequestStatus.Timeout, value: "Hết hạn" },
    { id: RequestStatus.Success, value: "Thành công" },
    { id: RequestStatus.Created, value: "Dã tạo" },
  ];

  const formSchema = z
    .object({
      dateFrom: z
        .date()
        .max(new Date(), {
          message: t("recharge.date.error1"),
        })
        .optional(),
      dateTo: z
        .date()
        .max(new Date(), {
          message: t("recharge.date.error1"),
        })
        .optional(),
      services: z.array(z.string()),
      statuses: z.array(z.number()),
    })
    .superRefine((data, ctx) => {
      if (data.dateTo && data.dateFrom && data.dateTo <= data.dateFrom) {
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
      services: value.services,
      statuses: value.statuses,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      handleSubmit({
        from: values.dateFrom,
        to: values.dateTo,
        services: values.services,
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
                <FormLabel>{t("recharge.toDate")}</FormLabel>
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
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("recharge.services.title")}</FormLabel>
                <Select
                  onValueChange={(event) => {
                    const arrays = form.getValues("services");
                    if (arrays.includes(event)) {
                      form.setValue(
                        "services",
                        arrays.filter((item) => item !== event)
                      );
                    } else {
                      form.setValue("services", [...arrays, event]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("recharge.services.placeholder")}
                      >
                        {field.value.length === 1
                          ? listServices.find(
                              (item) => item.id === field.value[0]
                            )?.value
                          : `${field.value.length} ${t("selected")}`}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listServices.map((item) => (
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
          <Button type="submit" className="w-full mt-5.5 button-color">
            {t("search")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RentForm;
