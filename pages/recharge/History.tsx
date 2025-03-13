import CustomDatePicker from "@/components/datepicker/CustomDataPicker";
import CustomSelect from "@/components/select/CustomSelect";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SIZE_LIST } from "@/contants/page";
import useObjectState from "@/hooks/use-object-state";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface RechargeType {
  value: string;
  label: string;
}

interface HistoryProps {
  rechargeTypes: RechargeType[];
}

interface RechargeRecord {
  index: number;
  receivedTime: dayjs.Dayjs;
  amount: number;
  balanceAfterTransfer: number;
  content: string;
}

interface HistoryState {
  data: RechargeRecord[];
  totalElements: number;
  params: {
    fromDate: dayjs.Dayjs;
    toDate: dayjs.Dayjs;
    type: dayjs.Dayjs;
    page: number;
    size: number;
  };
}
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
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
      type: dayjs(),
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
    <div>
      <div className="flex gap-5">
        <div>
          <CustomDatePicker title={t("recharge.fromDate")} className="h-10" />
        </div>
        <div>
          <CustomDatePicker title={t("recharge.toDate")} className="h-10" />
        </div>
        <div>
          <CustomSelect
            title={t("recharge.type")}
            onChange={() => {}}
            value="1"
            options={rechargeTypes}
            className="bg-[#f5f8fa] h-10"
          />
        </div>
        <div className="flex items-end">
          <Button className="bg-[#009ef7] w-15 h-10">
            <span className="svg-icon svg-icon-4 ms-1 me-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="3"
                stroke-linecap="butt"
                stroke-linejoin="arcs"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </Button>
        </div>
      </div>
      <hr className="border-t-2 border-gray-400 border-dashed my-4" />
      <div>
        <h3 className="font-bold">{t("recharge.historyRecharge")}</h3>
        <p className="text-[#a1a5b7] text-sm">
          {t("recharge.latest200RecordSuccess")}
        </p>
        <div className="flex items-center gap-1 mt-5">
          <span>Show</span>
          <span className="w-30">
            {" "}
            <CustomSelect
              onChange={changeSize}
              value={params.size}
              options={SIZE_LIST}
              className="h-10 p-0"
            />
          </span>
          <span>entities</span>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>{t("global.time")}</TableHead>
                <TableHead className="text-right">
                  {t("global.amount")}
                </TableHead>
                <TableHead className="text-right">
                  {t("global.balanceAfterTransfer")}
                </TableHead>
                <TableHead>{t("global.content")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell className="text-right">
                    {invoice.paymentMethod}
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>{" "}
          <div className="flex gap-5 justify-end">
            <span
              className="text-[#009ef7] text-sm cursor-pointer"
              onClick={changePage(-1)}
            >
              Previous
            </span>
            <span
              className="text-[#009ef7] text-sm cursor-pointer"
              onClick={changePage(1)}
            >
              Next
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
