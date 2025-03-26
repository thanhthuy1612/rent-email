"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import React from "react";
import RentForm from "@/components-page/rent/components/RentForm";
import { DataTable } from "@/components/ui/data-table";
import CustomPagination from "@/components/table/CustomPagination";
import { useAppSelector } from "@/lib/hooks";
import { IRequestBody, keyService } from "@/api/key/key.service";
import { toast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { cn, fNumber } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { dateFormat } from "@/lib/useTime";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const Rent: React.FC = () => {
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
  const { apiToken } = useAppSelector((item) => item.user);

  const fetchData = async (body?: IRequestBody) => {
    try {
      setIsLoading(true);
      const newBody = body ?? {
        pageNumber,
        pageSize,
        key: apiToken ?? "",
        from: search.from,
        to: search.to,
        services: search.services,
        statuses: search.statuses,
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
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-sky-500 hover:bg-sky-600 cursor-pointer"
            >
              {t("rent.title")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {t("rent.title")} {row.getValue("email")}
              </DialogTitle>
              <DialogDescription>{t("sure")}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    const res = await keyService.getNewEmail({
                      serviceName: row.getValue("serviceName"),
                      key: apiToken ?? "",
                    });
                    if (!res.code) {
                      toast({
                        title: t("alert.success"),
                        description: res.message,
                        duration: 10000,
                        className: cn(
                          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
                        ),
                      });
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
                    resetPage();
                  }
                }}
              >
                {t("rent.title")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
    <div className="max-w-[1120px] m-auto">
      <Card className="p-5 m-5 mb-8">
        <RentForm value={search} handleSubmit={submitData} />
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
export default Rent;
