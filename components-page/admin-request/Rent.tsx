"use client";

import { IRequest, managerService } from "@/api/user/manager/manager.service";
import RentForm from "@/components-page/rent/components/RentForm";
import CustomPagination from "@/components/table/CustomPagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/use-toast";
import { dateFormat } from "@/lib/useTime";
import { cn, fNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";

// ----------------------------------------------------------------------

export interface ISearch {
  from: Date;
  to: Date;
  services: string[];
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

const AdminRequest: React.FC = () => {
  const [data, setData] = React.useState<IData[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isDateAsc, setIsDateAs] = React.useState<boolean>(true);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [search, setSearch] = React.useState<ISearch>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
    services: [],
    statuses: [],
  });

  const t = useTranslations();

  const fetchData = async (body?: IRequest) => {
    try {
      setIsLoading(true);
      const newBody = body ?? {
        pageNumber,
        pageSize,
        from: search.from,
        to: search.to,
        services: search.services,
        statuses: search.statuses,
        dateAsc: isDateAsc,
        userIds: [],
      };
      const res = await managerService.getRequest(newBody);
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

  const resetPage = () => {
    if (!isLoading) {
      if (pageNumber !== 1) {
        setPageNumber(1);
      } else {
        fetchData();
      }
    }
  };

  const columns: ColumnDef<IData>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "userName",
      header: "Username",
    },
    {
      accessorKey: "serviceName",
      header: "Service",
    },
    {
      accessorKey: "originalPrice",
      header: "Price",
      cell: ({ row }) => <>{fNumber(row.getValue("originalPrice"), "vn")}</>,
    },
    {
      accessorKey: "discount",
      header: "Discount",
      cell: ({ row }) => <>{fNumber(row.getValue("discount"), "vn")}</>,
    },
    {
      accessorKey: "finalPrice",
      header: "Final Price",
      cell: ({ row }) => <>{fNumber(row.getValue("finalPrice"), "vn")}</>,
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
        <Badge
          className={`${row.getValue("status") === "Created" ? "bg-green-500" : "bg-red-500"} opacity-60`}
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

  const [listServices, setListServices] = React.useState<
    { id: string; value: string }[]
  >([]);
  const fetchServices = useCallback(async () => {
    try {
      const res = await managerService.getService();
      if (res && res.data) {
        setListServices(
          res.data.map((service: any) => ({
            id: service.name,
            value: service.name,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  }, []);

  React.useEffect(() => {
    resetPage();
  }, [pageSize]);

  React.useEffect(() => {
    fetchData();
  }, [isDateAsc, pageNumber]);

  React.useEffect(() => {
    fetchData();
    fetchServices();
  }, []);

  return (
    <div className="max-w-[1120px] m-auto">
      <Card className="p-5 m-5 mb-8">
        <RentForm
          value={search}
          handleSubmit={submitData}
          listServices={listServices}
        />
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
      </Card>
    </div>
  );
};
export default AdminRequest;
