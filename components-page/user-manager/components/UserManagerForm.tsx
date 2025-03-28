import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus } from "@/enums/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ----------------------------------------------------------------------

export interface IUserManagerFormProps {
  value: any;
  handleSubmit: (value: any) => void;
}
const UserManagerForm: React.FC<IUserManagerFormProps> = ({
  value,
  handleSubmit,
}) => {
  const t = useTranslations();

  const listType = [
    {
      id: UserStatus.Banned,
      value: "Banned",
    },
    {
      id: UserStatus.Active,
      value: "Active",
    },
  ];
  console.log("listType", UserStatus);
  const formSchema = z
    .object({
      searchUsername: z.string(),
      statuses: z.array(z.number()),
    })
    .strict();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchUsername: value.searchUsername,
      statuses: value.statuses,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      handleSubmit({
        ...values,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="col-span-1 md:col-span-2">
            <FormField
              control={form.control}
              name="searchUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tìm theo tên</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={"Nhập tên"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
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
                            ? listType.find(
                                (item) => item.id === field.value[0]
                              )?.value
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
          </div>
          <Button
            type="submit"
            className="w-full mt-5.5 col-span-1 cursor-pointer bg-sky-500 hover:bg-sky-600"
          >
            {t("search")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserManagerForm;
