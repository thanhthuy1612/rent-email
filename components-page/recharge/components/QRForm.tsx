import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IQR } from "../ShowQR";

// ----------------------------------------------------------------------

export interface IQRFormProps {
  handleSubmit: (value: IQR) => void;
}

const QRForm: React.FC<IQRFormProps> = ({ handleSubmit }) => {
  const t = useTranslations();

  const { userName } = useAppSelector((item) => item.user);
  const formSchema = z.object({
    amount: z.number().min(1, { message: "Số tiền phải lớn hơn 0" }),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      description: `CHOTP ${userName}`,
    },
  });

  const parseCurrency = (currencyString: string) => {
    const numberString = currencyString.replace(/[₫,.\s]/g, "");
    return parseFloat(numberString);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      handleSubmit({
        amount: values.amount,
        description: values.description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className=" col-span-1 md:col-span-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tiền</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Số tiền"
                      value={field.value}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(isNaN(value) ? "" : value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" col-span-1 md:col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung chuyển khoản</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="Nội dung chuyển khoản"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-5.5 cursor-pointer bg-sky-500 hover:bg-sky-600"
          >
            Tạo QR
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QRForm;
