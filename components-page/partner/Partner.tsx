"use client";

import { managerService } from "@/api/user/manager/manager.service";
import PartnerForm from "@/components-page/partner/PartnerForm";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DateFormatType } from "@/enums/DateFormatType";
import { toast } from "@/hooks/use-toast";
import { dateFormat } from "@/lib/useTime";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

export interface IData {
  name: string;
  apiKey: string;
  baseUrl: string;
  configurations: string;
  priority: number;
  creationDate: Date;
  modificationDate: Date;
  isDeleted: boolean;
}

const Partner: React.FC = () => {
  const [result, setResult] = React.useState<IData[]>([]);
  const [data, setData] = React.useState<IData[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [isOpen, setIsOpen] = React.useState<Row<IData> | null>();

  const t = useTranslations();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await managerService.getPartner();
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
        title: t("alert.success"),
        description: t("partner.copySuccess"),
        className: cn(
          "top-0 right-0 flex fixed max-w-1/2 md:max-w-[420px] top-4 right-4"
        ),
      });
    } catch (err) {
      toast({
        title: t("alert.error"),
        description: t("partner.copyFailed"),
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed max-w-1/2 md:max-w-[420px] top-4 right-4 text-white"
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

  const getValue = (value: string) => {
    return `${value.substring(0, 6)}...${value.slice(-3)}`;
  };

  const columns: ColumnDef<IData>[] = [
    {
      accessorKey: "name",
      header: t("partner.name"),
    },
    {
      accessorKey: "apiKey",
      header: t("partner.key"),
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  handleCopy(row.getValue("apiKey"));
                }}
                type="submit"
                size="sm"
                className="px-3 button-color "
              >
                <span className="sr-only">{t("partner.copy")}</span>
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{getValue(row.getValue("apiKey"))}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "baseUrl",
      header: t("partner.baseUrl"),
    },
    {
      accessorKey: "priority",
      header: t("partner.priority"),
    },
    {
      accessorKey: "configurations",
      header: t("partner.configurations"),
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
      cell: ({ row }) => (
        <>{dateFormat(row.getValue("creationDate"), DateFormatType.FullDate)}</>
      ),
    },
    {
      accessorKey: "isDeleted",
      header: t("partner.isDeleted"),
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
        <Button
          size="sm"
          className="button-color "
          onClick={() => setIsOpen(row)}
        >
          <Pen />
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 mx-5">
      <Card className="p-5 mb-8">
        <h3 className="font-bold">{t("rent.titleHeader")}</h3>
        <DataTable columns={columns} data={data} />
        <CustomPagination
          total={total}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </Card>

      {isOpen && (
        <Dialog
          open={!!isOpen}
          onOpenChange={(open) => setIsOpen(open ? isOpen : null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("update")}</DialogTitle>
            </DialogHeader>
            <PartnerForm
              data={{
                name: isOpen.getValue("name"),
                apiKey: isOpen.getValue("apiKey"),
                baseUrl: isOpen.getValue("baseUrl"),
                configurations: isOpen.getValue("configurations"),
                priority: isOpen.getValue("priority"),
                isDeleted: isOpen.getValue("isDeleted"),
              }}
              handleSubmit={() => {
                fetchData();
                setIsOpen(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
export default Partner;
