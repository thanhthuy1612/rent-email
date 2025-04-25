"use client";

import { IRequest, managerService } from "@/api/user/manager/manager.service";
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
import RentForm from "./components/RentForm";
import { DateFormatType } from "@/enums/DateFormatType";

// ----------------------------------------------------------------------

export interface ISearch {
  from?: Date;
  to?: Date;
  services: string[];
  statuses: number[];
  userIds: string[];
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
  const [isDateAsc, setIsDateAs] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [search, setSearch] = React.useState<ISearch>({
    services: [],
    statuses: [],
    userIds: [],
  });
  const [res, setRes] = React.useState<any>();

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
        userIds: search.userIds,
      };
      const res = await managerService.getRequest(newBody);
      if (!res.code) {
        setData(res.data.data);
        setTotal(res.data.total);
        setRes(res.data);
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

  const resetPage = () => {
    if (!isLoading) {
      if (pageNumber !== 1) {
        setPageNumber(1);
      } else {
        fetchData();
      }
    }
  };

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
          "top-0 right-0 flex fixed max-w-1/2 md:max-w-[420px] top-4 right-4"
        ),
      });
    }
  };

  const columns: ColumnDef<IData>[] = [
    {
      accessorKey: "email",
      header: t("adminRequest.email"),
      cell: ({ row }) => (
        <div
          onClick={() => handleCopy(row.getValue("email"))}
          className="font-bold px-2 cursor-pointer"
        >
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "userName",
      header: t("adminRequest.username"),
    },
    {
      accessorKey: "serviceName",
      header: t("adminRequest.service"),
    },
    {
      accessorKey: "originalPrice",
      header: t("adminRequest.price"),
      cell: ({ row }) => <>{fNumber(row.getValue("originalPrice"), "vn")}</>,
    },
    // {
    //   accessorKey: "discount",
    //   header: t("adminRequest.discount"),
    //   cell: ({ row }) => <>{fNumber(row.getValue("discount"), "vn")}</>,
    // },
    // {
    //   accessorKey: "finalPrice",
    //   header: t("adminRequest.finalPrice"),
    //   cell: ({ row }) => <>{fNumber(row.getValue("finalPrice"), "vn")}</>,
    // },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => {
        return row.getValue("code") ? (
          <div
            onClick={() => handleCopy(row.getValue("code"))}
            className="font-bold cursor-pointer text-sky-700"
          >
            {row.getValue("code")}
          </div>
        ) : (
          <></>
        );
      },
    },
    {
      accessorKey: "creationDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => setIsDateAs((pre) => !pre)}>
            {t("adminRequest.date")}
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
    <div className=" flex flex-col gap-6 mx-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-violet-50 border-violet-500 text-violet-500">
          Huỷ <p>{res.cancelCount}</p>
        </Card>
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-yellow-50 border-yellow-500 text-yellow-500">
          Tạo <p>{res.createdCount}</p>
        </Card>
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-green-50 border-green-500 text-green-500">
          Thành công <p>{res.successCount}</p>
        </Card>
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-red-50 border-red-500 text-red-500">
          Hết giờ <p>{res.timeoutCount}</p>
        </Card>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-stone-50 border-stone-500 text-stone-500">
          Hoàn lại tiền<p>{fNumber(res.totalRefund, "vn")}</p>
        </Card>
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-blue-50 border-blue-500 text-blue-500">
          Tổng chi tiêu<p>{fNumber(res.totalSpent, "vn")}</p>
        </Card>
      </div>
      <Card className="p-5">
        <RentForm
          value={search}
          handleSubmit={submitData}
          listServices={listServices}
        />
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
export default AdminRequest;
