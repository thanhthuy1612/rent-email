"use client";

import {
  ITransaction,
  managerService,
} from "@/api/user/manager/manager.service";
import RechargeForm from "@/components-page/admin-recharge/components/RechargeForm";
import CustomPagination from "@/components/table/CustomPagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { DateFormatType } from "@/enums/DateFormatType";
import { toast } from "@/hooks/use-toast";
import { dateFormat } from "@/lib/useTime";
import { cn, fNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export interface ISearch {
  from?: Date;
  to?: Date;
  types: number[];
  statuses: number[];
}

export interface IData {
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

const AdminRecharge: React.FC = () => {
  const [data, setData] = React.useState<IData[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isDateAsc, setIsDateAs] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [search, setSearch] = React.useState<ISearch>({
    types: [],
    statuses: [],
  });
  const t = useTranslations();

  const fetchData = async (body?: ITransaction) => {
    try {
      setIsLoading(true);
      const newBody = body ?? {
        pageNumber,
        pageSize,
        from: search.from,
        to: search.to,
        types: search.types,
        statuses: search.statuses,
        dateAsc: isDateAsc,
        userIds: [],
      };
      const res = await managerService.getTransaction(newBody);
      if (!res.code) {
        setData(res.data.data);
        setTotal(res.data.total);
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
    if (!isLoading) {
      fetchData();
    }
  }, [isDateAsc, pageNumber]);

  const resetPage = () => {
    if (!isLoading) {
      if (pageNumber !== 1) {
        setPageNumber(1);
      } else {
        fetchData();
      }
    }
  };
  React.useEffect(() => {
    resetPage();
  }, [pageSize]);

  const columns: ColumnDef<IData>[] = [
    {
      accessorKey: "userName",
      header: t("adminRecharge.username"),
    },
    {
      accessorKey: "type",
      header: t("adminRecharge.type"),
    },
    {
      accessorKey: "amount",
      header: t("adminRecharge.amount"),
      cell: ({ row }) => <>{fNumber(row.getValue("amount"), "vn")}</>,
    },
    {
      accessorKey: "balanceBefore",
      header: t("adminRecharge.before"),
      cell: ({ row }) => <>{fNumber(row.getValue("balanceBefore"), "vn")}</>,
    },
    {
      accessorKey: "balanceAfter",
      header: t("adminRecharge.after"),
      cell: ({ row }) => <>{fNumber(row.getValue("balanceAfter"), "vn")}</>,
    },
    {
      accessorKey: "description",
      header: t("adminRecharge.description"),
    },
    {
      accessorKey: "transCode",
      header: t("adminRecharge.code"),
    },
    {
      accessorKey: "creationDate",
      header: ({}) => {
        return (
          <Button variant="ghost" onClick={() => setIsDateAs((pre) => !pre)}>
            {t("adminRecharge.date")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <>{dateFormat(row.getValue("creationDate"), DateFormatType.FullDate)}</>
      ),
    },
    {
      accessorKey: "status",
      header: t("adminRequest.status"),
      cell: ({ row }) => (
        <Badge
          className={`${
            row.getValue("status") === "Success"
              ? "bg-green-500"
              : row.getValue("status") === "Created"
                ? "bg-amber-500"
                : "bg-red-500"
          } opacity-60`}
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
  ];

  const submitData = async (values: ISearch) => {
    setSearch(values);
    fetchData({
      pageNumber,
      pageSize,
      ...values,
      dateAsc: false,
      userIds: [],
    });
  };

  return (
    <div className=" flex flex-col gap-6 mx-5">
      <Card className="p-5">
        <RechargeForm value={search} handleSubmit={submitData} />
      </Card>
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
    </div>
  );
};

export default AdminRecharge;
