"use client";

import { IRequestBody, keyService } from "@/api/key/key.service";
import { managerService } from "@/api/user/manager/manager.service";
import AddRentForm from "@/components-page/rent/components/AddRent";
import CustomPagination from "@/components/table/CustomPagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { dateFormat } from "@/lib/useTime";
import { cn, fNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";

// ----------------------------------------------------------------------

export interface ISearch {
  from?: Date;
  to?: Date;
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

const Rent: React.FC = () => {
  const [data, setData] = React.useState<IData[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isDateAsc, setIsDateAs] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(20);
  const [listServices, setListServices] = React.useState<
    { id: string; value: string }[]
  >([]);

  const intervalIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const t = useTranslations();
  const { apiToken } = useAppSelector((item) => item.user);

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
  const fetchData = async (body?: IRequestBody) => {
    try {
      setIsLoading(true);
      const newBody = body ?? {
        pageNumber,
        pageSize,
        key: apiToken ?? "",
        dateAsc: isDateAsc,
      };
      const res = await keyService.getRequest(newBody);
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
          className={`${
            row.getValue("status") === "Created" ? "bg-green-500" : "bg-red-500"
          } opacity-60`}
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
  ];

  React.useEffect(() => {
    fetchServices();
    fetchData();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const resetPage = () => {
    if (!isLoading) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if (pageNumber !== 1) {
        setPageNumber(1);
      } else {
        intervalIdRef.current = setInterval(() => {
          fetchData();
        }, 10000);
      }
    }
  };

  React.useEffect(() => {
    resetPage();
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [pageSize]);

  React.useEffect(() => {
    fetchData();
    intervalIdRef.current = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isDateAsc, pageNumber]);

  return (
    <div className=" flex flex-col gap-6 mx-5">
      <Card className="p-5">
        <h3 className="font-bold">{t("rent.addNew")}</h3>
        <AddRentForm resetPage={resetPage} listServices={listServices} />
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
export default Rent;
