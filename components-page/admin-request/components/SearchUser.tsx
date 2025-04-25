"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
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
import { useTranslations } from "next-intl";
import React from "react";
import { IUser } from "./RentForm";

// ----------------------------------------------------------------------

export interface ISearchUser {
  form: any;
  users: IUser[];
}

// ----------------------------------------------------------------------
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchUser: React.FC<ISearchUser> = ({ form, users }) => {
  const [listUsers, setListUser] = React.useState<IUser[]>([]);
  const [searchUsername, setSearchUsername] = React.useState<string>("");
  const debouncedSearchValue = useDebounce(searchUsername, 300);
  const t = useTranslations();

  React.useEffect(() => {
    if (debouncedSearchValue) {
      setListUser(
        users.filter((status) =>
          status.userName
            .toLowerCase()
            .includes(debouncedSearchValue.toLowerCase())
        )
      );
    } else {
      setListUser(users);
      setSearchUsername("");
    }
  }, [debouncedSearchValue, listUsers]);

  return (
    <FormField
      control={form.control}
      name="userIds"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Người dùng</FormLabel>
          <Select
            onValueChange={(event) => {
              const arrays = form.getValues("userIds");
              if (arrays.includes(Number(event))) {
                form.setValue(
                  "userIds",
                  arrays.filter((item: any) => item !== Number(event))
                );
              } else {
                form.setValue("userIds", [...arrays, Number(event)]);
              }
            }}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("recharge.statuses.placeholder")}>
                  {field.value.length === 1
                    ? users.find((item) => item.id === field.value[0])?.userName
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
  );
};

export default SearchUser;
