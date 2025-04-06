"use client";

import { managerService } from "@/api/user/manager/manager.service";
import DiscountForm from "@/components-page/discount/DiscountForm";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DateFormatType } from "@/enums/DateFormatType";
import { toast } from "@/hooks/use-toast";
import { dateFormat } from "@/lib/useTime";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

export interface IData {
  promotion: number;
  startTime: Date;
  endTime: Date;
  isDeleted: boolean;
}

const Discount: React.FC = () => {
  const [result, setResult] = React.useState<IData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const t = useTranslations();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await managerService.getDiscount();
      if (!res.code) {
        setResult(res.data);
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
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className=" flex flex-col gap-6 mx-5">
      <Card className="p-5 mb-8">
        <h3 className="font-bold">{t("discount.title")}</h3>
        <div className="border-2 p-5 border-dashed rounded-md border-pink-500 bg-pink-200">
          <div className="grid grid-cols-3">
            <label className="text-pink-500 font-bold col-span-1">
              {t("service.discount")}
            </label>
            <span className="col-span-2 text-pink-500">
              {result?.promotion}
            </span>
          </div>
          <div className="grid grid-cols-3">
            <label className="text-pink-500 font-bold col-span-1">
              {t("service.isDeleted")}
            </label>
            <span className="col-span-2 text-pink-500">
              {result?.isDeleted ? t("global.yes") : t("global.no")}
            </span>
          </div>
          <p className="text-pink-500 text-center my-5 font-bold">
            {dateFormat(result?.startTime, DateFormatType.FullDate)} -{" "}
            {dateFormat(result?.endTime, DateFormatType.FullDate)}
          </p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div className="flex justify-center mt-5">
                <Button className="bg-pink-500 w-1/2 hover:bg-pink-600 cursor-pointer">
                  <Pen /> {t("update")}
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("update")}</DialogTitle>
              </DialogHeader>
              <DiscountForm
                data={{
                  promotion: result?.promotion ?? 0,
                  startTime: result?.startTime ?? new Date(),
                  endTime: result?.endTime ?? new Date(),
                  isDeleted: result?.isDeleted ?? false,
                }}
                handleSubmit={() => {
                  fetchData();
                  setIsOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};
export default Discount;
