"use client";

import { managerService } from "@/api/user/manager/manager.service";
import ServiceForm from "@/components-page/service/ServiceForm";
import CustomPagination from "@/components/table/CustomPagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { dateFormat } from "@/lib/useTime";
import { cn, fNumber } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

export interface IData {
  name: string;
  mailType: number;
  price: number;
  discount: number;
  description: string;
  creationDate: Date;
  modificationDate: Date;
  isDeleted: true;
  partnerName: string;
}

const Service: React.FC = () => {
  const [result, setResult] = React.useState<IData[]>([]);
  const [data, setData] = React.useState<IData[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const t = useTranslations();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await managerService.getService();
      if (!res.code) {
        setResult(res.data);
        setData(res.data);
        setTotal(res.data.length);
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
    if (isLoading) {
      fetchData();
    }
  }, []);

  React.useEffect(() => {
    setData(result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize));
  }, [pageNumber]);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: t("global.copySuccess"),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } catch (err) {
      toast({
        title: t("global.copyFailed"),
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white"
        ),
      });
    }
  };

  React.useEffect(() => {
    if (!isLoading) {
      if (pageNumber !== 1) {
        setPageNumber(1);
      } else {
        setData(
          result.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
        );
      }
    }
  }, [pageSize]);

  const columns: ColumnDef<IData>[] = [
    {
      accessorKey: "name",
      header: t("service.name"),
    },
    {
      accessorKey: "partnerName",
      header: t("service.partnerName"),
    },
    {
      accessorKey: "price",
      header: t("service.price"),
      cell: ({ row }) => <>{fNumber(row.getValue("price"), "vn")}</>,
    },
    {
      accessorKey: "discount",
      header: t("service.discount"),
      cell: ({ row }) => <>{fNumber(row.getValue("discount"), "vn")}</>,
    },
    {
      accessorKey: "description",
      header: t("service.description"),
    },
    {
      accessorKey: "creationDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("global.creationDate")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <>{dateFormat(row.getValue("creationDate"))}</>,
    },
    {
      accessorKey: "isDeleted",
      header: t("global.isDeleted"),
      cell: ({ row }) => (
        <Badge
          className={`${
            row.getValue("isDeleted") ? "bg-green-500" : "bg-red-500"
          } opacity-60`}
        >
          {row.getValue("isDeleted") ? t("global.yes") : t("global.no")}
        </Badge>
      ),
    },
    {
      accessorKey: "action",
      header: t("global.action"),
      cell: ({ row }) => (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-sky-500 hover:bg-sky-600 cursor-pointer"
            >
              <Pen />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("update")}</DialogTitle>
            </DialogHeader>
            <ServiceForm
              data={{
                name: row.getValue("name"),
                price: row.getValue("price"),
                discount: row.getValue("discount"),
                description: row.getValue("description"),
                partnerName: row.getValue("partnerName"),
                isDeleted: row.getValue("isDeleted"),
              }}
              handleSubmit={() => {
                fetchData();
                setIsOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  return (
    <div className=" flex flex-col gap-6 mx-5">
      <Card className="p-5 mb-8">
        <h3 className="font-bold">{t("service.title")}</h3>
        <DataTable columns={columns} data={data} />
        <CustomPagination
          total={total}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </Card>
    </div>
  );
};
export default Service;
