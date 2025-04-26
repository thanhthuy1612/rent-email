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
import { dateFormat } from "@/lib/useTime";
import { RequestStatus } from "@/enums/enum";
import { managerService } from "@/api/user/manager/manager.service";
import { toast } from "@/hooks/use-toast";
import { ISearch } from "../Rent";

// ----------------------------------------------------------------------

export interface IRentFormProps {
  value: ISearch;
  handleSubmit: (value: ISearch) => void;
  listServices: any[];
  listPartners: any[];
}

export interface IUser {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  promotion: number;
  finalAmount: number;
  balanceBefore: number;
  balanceAfter: number;
  type: number;
  transCode: string;
  description: string;
  status: number;
  creationDate: Date;
  modificationDate: Date;
}

const RentForm: React.FC<IRentFormProps> = ({
  value,
  handleSubmit,
  listServices,
  listPartners,
}) => {
  const [users, setUser] = React.useState<IUser[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const t = useTranslations();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await managerService.getAll({});
      if (!res.code) {
        setUser(res.data.data);
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
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

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
      userIds: z.array(z.string()),
      partnerNames: z.array(z.string()),
    })
    .superRefine((data, ctx) => {
      if (data.dateTo && data.dateFrom && data.dateTo < data.dateFrom) {
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
      userIds: value.userIds,
      partnerNames: value.partnerNames,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let fromDate = undefined;
      let toDate = undefined;
      if (values.dateFrom) {
        fromDate = new Date(values.dateFrom);
        fromDate.setHours(0, 0, 0, 0);
      }
      if (values.dateTo) {
        toDate = new Date(values.dateTo);
        toDate.setHours(11, 59, 59, 59);
      }
      handleSubmit({
        from: fromDate,
        to: toDate,
        services: values.services,
        statuses: values.statuses,
        userIds: values.userIds,
        partnerNames: values.partnerNames,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
          <FormField
            control={form.control}
            name="userIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Người dùng</FormLabel>
                <Select
                  onValueChange={(event) => {
                    const arrays = form.getValues("userIds");
                    if (arrays.includes(event)) {
                      console.log(arrays.filter((item) => item !== event));
                      form.setValue(
                        "userIds",
                        arrays.filter((item) => item !== event)
                      );
                    } else {
                      form.setValue("userIds", [...arrays, event]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn">
                        {field.value.length === 1
                          ? users.find((item) => item.id === field.value[0])
                              ?.userName
                          : `${field.value.length} ${t("selected")}`}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        <Checkbox checked={field.value.includes(item.id)} />
                        {item.userName}
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
            name="partnerNames"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lọc đối tác</FormLabel>
                <Select
                  onValueChange={(event) => {
                    const arrays = form.getValues("partnerNames");
                    if (arrays.includes(event)) {
                      form.setValue(
                        "partnerNames",
                        arrays.filter((item) => item !== event)
                      );
                    } else {
                      form.setValue("partnerNames", [...arrays, event]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Chọn đối tác"
                      >
                        {field.value.length === 1
                          ? listPartners.find(
                              (item) => item.name === field.value[0]
                            )?.value
                          : `${field.value.length} ${t("selected")}`}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listPartners.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        <Checkbox checked={field.value.includes(item.name)} />
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="userIds"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Người dùng</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[100%] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? users.find((user) => user.userName === field.value)
                              ?.userName
                          : "Select user"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {users.map((user) => (
                            <CommandItem
                              value={user.userName}
                              key={user.userId}
                              onSelect={() => {
                                form.setValue("userIds", user.userName);
                              }}
                            >
                              {user.userName}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  user.userName === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <SearchUser form={form} users={users} /> */}
          <Button type="submit" className="w-full mt-5.5 button-color">
            {t("search")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RentForm;
