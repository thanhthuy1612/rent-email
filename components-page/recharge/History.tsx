"use client";

import { ITransactionBody, keyService } from "@/api/key/key.service";
import RechargeForm from "@/components-page/recharge/components/RechargeForm";
import CustomPagination from "@/components/table/CustomPagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { dateFormat } from "@/lib/useTime";
import { cn, fNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export interface ISearch {
  from: Date;
  to: Date;
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

const History: React.FC = () => {
  const [data, setData] = React.useState<IData[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isDateAsc, setIsDateAs] = React.useState<boolean>(true);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [search, setSearch] = React.useState<ISearch>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
    types: [],
    statuses: [],
  });
  const t = useTranslations();
  const { apiToken } = useAppSelector((item) => item.user);

  const fetchData = async (body?: ITransactionBody) => {
    try {
      setIsLoading(true);
      const newBody = body ?? {
        pageNumber,
        pageSize,
        key: apiToken ?? "",
        from: search.from,
        to: search.to,
        types: search.types,
        statuses: search.statuses,
        dateAsc: isDateAsc,
      };
      const res = await keyService.getTransaction(newBody);
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
    if (!isLoading) {
      fetchData();
    }
  }, [isDateAsc, pageNumber]);

  React.useEffect(() => {
    if (!isLoading) {
      if (pageNumber !== 1) {
        setPageNumber(1);
      } else {
        fetchData();
      }
    }
  }, [pageSize]);

  const columns: ColumnDef<IData>[] = [
    {
      accessorKey: "userName",
      header: "Username",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <>{fNumber(row.getValue("amount"), "vn")}</>,
    },
    {
      accessorKey: "balanceBefore",
      header: "Before",
      cell: ({ row }) => <>{fNumber(row.getValue("balanceBefore"), "vn")}</>,
    },
    {
      accessorKey: "balanceAfter",
      header: "After",
      cell: ({ row }) => <>{fNumber(row.getValue("balanceAfter"), "vn")}</>,
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "transCode",
      header: "Code",
    },
    {
      accessorKey: "creationDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => setIsDateAs((pre) => !pre)}>
            Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <>{dateFormat(row.getValue("creationDate"))}</>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("status")}</Badge>
      ),
    },
  ];

  const submitData = async (values: ISearch) => {
    setSearch(values);
    fetchData({
      pageNumber,
      pageSize,
      key: apiToken ?? "",
      ...values,
      dateAsc: false,
    });
  };

  return (
    <>
      <RechargeForm value={search} handleSubmit={submitData} />
      <div className="mt-5">
        <h3 className="font-bold">{t("recharge.historyRecharge")}</h3>
      </div>
      <DataTable columns={columns} data={data} />
      <CustomPagination
        total={total}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
};

export default History;
