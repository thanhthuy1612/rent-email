"use client";

import CustomDatePicker from "@/components/datepicker/CustomDataPicker";
import CustomSelect from "@/components/select/CustomSelect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SERVER_LIST, STATUS_LIST } from "@/constants/select";
import useObjectState from "@/hooks/use-object-state";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React from "react";

interface RechargeType {
  value: string;
  label: string;
}

interface HistoryProps {
  rechargeTypes?: RechargeType[];
}

interface RentRecord {
  serviceName: string;
  price: string;
  phoneNumber: string;
  code: string;
  time: string;
  status: string;
  message: string;
}

interface HistoryState {
  data: RentRecord[];
  totalElements: number;
  params: {
    fromDate: dayjs.Dayjs;
    toDate: dayjs.Dayjs;
    type: number;
    page: number;
    size: number;
  };
}
const fakeData = [
  {
    time: "2025-03-15T14:30:00Z",
    service: "Internet Subscription",
    price: 150000,
    phoneNumber: "0987654321",
    code: "SUB12345",
    status: "success",
    message: "Subscription successful",
  },
  {
    time: "2025-03-15T15:00:00Z",
    service: "Mobile Top-up",
    price: 50000,
    phoneNumber: "0912345678",
    code: "TOPUP6789",
    status: "pending",
    message: "Processing payment",
  },
  {
    time: "2025-03-15T15:45:00Z",
    service: "Electricity Bill Payment",
    price: 300000,
    phoneNumber: "0978123456",
    code: "BILL202503",
    status: "failed",
    message: "Insufficient funds",
  },
];
const History: React.FC<HistoryProps> = ({ rechargeTypes }) => {
  const t = useTranslations();
  const [state, setState] = useObjectState<HistoryState>({
    data: [],
    totalElements: 0,
    params: {
      fromDate: dayjs(),
      toDate: dayjs(),
      type: 0,
      page: 0,
      size: 50,
    },
  });

  const { data, totalElements, params } = state;

  const setParams = (newParams: Object) => {
    setState({ params: { ...params, ...newParams } });
  };

  const changePage = (delta: number) => () => {
    setParams({ page: params.page + delta });
  };

  const changeSize = (size: number): void => {
    setParams({ size });
  };

  return (
    <div className="max-w-[1120px] m-auto">
      <Card className="p-5 mb-8">
        <div className="flex gap-5">
          <CustomDatePicker
            title={t("recharge.fromDate")}
            className="h-10 bg-[#f5f8fa]"
          />
          <CustomDatePicker
            title={t("recharge.toDate")}
            className="h-10 bg-[#f5f8fa]"
          />
          <CustomSelect
            title={t("global.service")}
            onChange={() => {}}
            value="1"
            options={SERVER_LIST}
            className="bg-[#f5f8fa] h-10"
          />
          <CustomSelect
            title={t("global.service")}
            onChange={() => {}}
            value="1"
            options={STATUS_LIST}
            className="bg-[#f5f8fa] h-10"
          />
          <div className="flex items-end">
            <Button className="bg-sky-500 hover:bg-sky-600 cursor-pointer shadow-md mb-1">
              <span className="svg-icon svg-icon-4 ms-1 me-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </Button>
          </div>
        </div>{" "}
      </Card>
      <Card className="p-5 mb-8">
        <div>
          <h3 className="font-bold">{t("rentHistory.rentHistory")}</h3>
          <p className="text-[#a1a5b7] text-sm">
            {t("rentHistory.latest100Record")}
          </p>
          <div className="flex justify-end">
            <Input className="w-40" placeholder="Search" />
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>{t("global.service")}</TableHead>
                  <TableHead>{t("global.price")}</TableHead>
                  <TableHead>{t("global.phoneNumber")}</TableHead>
                  <TableHead>{t("global.code")}</TableHead>
                  <TableHead>{t("global.time")}</TableHead>
                  <TableHead>{t("global.status")}</TableHead>
                  <TableHead>{t("global.message")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fakeData.map((data, index) => (
                  <TableRow key={data.code}>
                    <TableCell className="font-medium">
                      {params.page * params.size + index + 1}
                    </TableCell>
                    <TableCell>{data.service}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.phoneNumber}</TableCell>
                    <TableCell>{data.code}</TableCell>
                    <TableCell>{data.time}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>{" "}
          </div>
        </div>
      </Card>{" "}
    </div>
  );
};

export default History;
