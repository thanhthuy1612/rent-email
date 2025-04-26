"use client";

import { IRequestBody, keyService } from "@/api/key/key.service";
import AddRentForm from "@/components-page/rent/components/AddRent";
import CustomPagination from "@/components/table/CustomPagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { DateFormatType } from "@/enums/DateFormatType";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { dateFormat } from "@/lib/useTime";
import { cn, fNumber } from "@/lib/utils";
import { ColumnDef, Row } from "@tanstack/react-table";
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
  const [search, setSearch] = React.useState<ISearch>({
    services: [],
    statuses: [],
  });
  const [res, setRes] = React.useState<any>();

  const intervalIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const t = useTranslations();
  const { apiToken } = useAppSelector((item) => item.user);

  const fetchServices = useCallback(async () => {
    try {
      const res = await keyService.getService({ key: apiToken ?? "" });
      if (res && res.data) {
        setListServices(
          res.data.map((service: any) => ({
            id: service.name,
            value: service.name,
            price: service.price,
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
      header: "Email",
      cell: ({ row }) => (
        <div
          onClick={() => handleCopy(row.getValue("email"))}
          className="font-bold cursor-pointer"
        >
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Id",
    },
    // {
    //   accessorKey: "userName",
    //   header: "Tài khoản",
    // },
    {
      accessorKey: "serviceName",
      header: "Dịch vụ",
    },
    // {
    //   accessorKey: "originalPrice",
    //   header: "Giá",
    //   cell: ({ row }) => <>{fNumber(row.getValue("originalPrice"), "vn")}</>,
    // },
    // {
    //   accessorKey: "discount",
    //   header: "Giảm giá",
    //   cell: ({ row }) => <>{fNumber(row.getValue("discount"), "vn")}</>,
    // },
    {
      accessorKey: "finalPrice",
      header: "Giá",
      cell: ({ row }) => <>{fNumber(row.getValue("finalPrice"), "vn")}</>,
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => {
        return row.getValue("code") ? (
          <div
            onClick={() => handleCopy(row.getValue("code"))}
            className="font-bold px-2 cursor-pointer text-sky-700"
          >
            {row.getValue("code")}
          </div>
        ) : row.getValue("status") === "Created" ? (
          <Button
            className="cursor-pointer button-color"
            onClick={() => handleGetCode(row)}
            size="sm"
          >
            Lấy code
          </Button>
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
            Ngày tạo
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
      header: "Trạng thái",
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

  // const submitData = async (values: ISearch) => {
  //   setSearch(values);
  //   if (intervalIdRef.current) {
  //     clearInterval(intervalIdRef.current);
  //   }
  //   await fetchData({
  //     pageNumber,
  //     pageSize,
  //     ...values,
  //     dateAsc: false,
  //     key: apiToken ?? "",
  //   });
  //   intervalIdRef.current = setInterval(() => {
  //     fetchData({
  //       pageNumber,
  //       pageSize,
  //       ...values,
  //       dateAsc: false,
  //       key: apiToken ?? "",
  //     });
  //   }, 10000);
  // };

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
        fetchData();
        intervalIdRef.current = setInterval(() => {
          fetchData();
        }, 10000);
      }
    }
  };

  const handleGetCode = async (row: Row<IData>) => {
    try {
      const res = await keyService.getCode({
        key: apiToken ?? "",
        requestId: row.getValue("id"),
      });
      toast({
        title: !res.code ? "Thành công" : "Lỗi",
        description: res.message,
        className: cn(
          "top-0 right-0 flex fixed max-w-1/2 md:max-w-[420px] top-4 right-4"
        ),
      });
      resetPage();
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-violet-50 border-violet-500 text-violet-500">
          Huỷ <p>{res?.cancelCount}</p>
        </Card>
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-yellow-50 border-yellow-500 text-yellow-500">
          Tạo <p>{res?.createdCount}</p>
        </Card>
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-green-50 border-green-500 text-green-500">
          Thành công <p>{res?.successCount}</p>
        </Card>
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-red-50 border-red-500 text-red-500">
          Hết giờ <p>{res?.timeoutCount}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        {/* <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-stone-50 border-stone-500 text-stone-500">
          Hoàn lại tiền<p>{fNumber(res?.totalRefund, "vn")} đ</p>
        </Card> */}
        <Card className="p-3 gap-2 flex flex-cols place-items-center justify-center bg-blue-50 border-blue-500 text-blue-500">
          Tổng chi tiêu<p>{fNumber(res?.totalSpent, "vn")} đ</p>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <Card className="p-5">
          <h3 className="font-bold">{t("rent.addNew")}</h3>
          <AddRentForm resetPage={resetPage} listServices={listServices} />
        </Card>
      </div>
      
      {/* <Card className="p-5">
        <RentForm
          value={search}
          handleSubmit={submitData}
          listServices={listServices}
        />
      </Card> */}
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
