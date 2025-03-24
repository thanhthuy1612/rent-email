"use client";
import CustomSelect from "@/components/select/CustomSelect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SERVER_LIST } from "@/constants/select";
import useObjectState from "@/hooks/use-object-state";
import { useTranslations } from "next-intl";
import React from "react";
import PhoneCopyComponent from "./components/InfoBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ----------------------------------------------------------------------

interface RentRecord {
  serviceName: string;
  price: string;
  phoneNumber: string;
  code: string;
  time: string;
  status: string;
  message: string;
}
interface RentState {
  data: RentRecord[];
  totalElements: number;
  params: {
    server: number;
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
const Rent: React.FC = () => {
  const t = useTranslations();
  const [state, setState] = useObjectState<RentState>({
    data: [],
    totalElements: 0,
    params: {
      server: 0,
      page: 0,
      size: 50,
    },
  });
  const { data, totalElements, params } = state;

  const setParams = (newParams: Object) => {
    setState({ params: { ...params, ...newParams } });
  };
  const handleChangeServer = (value: number) => {
    setParams({ server: value });
  };
  return (
    <div className="max-w-[1120px] m-auto">
      <Card className="p-7 mb-8">
        <div className="flex gap-5">
          <div className="flex items-end">
            <CustomSelect
              onChange={handleChangeServer}
              value={params.server}
              options={SERVER_LIST}
              className="h-10 p-0 bg-[#f5f8fa]"
              title={t("global.server")}
            />
          </div>

          <div className="flex items-end">
            <CustomSelect
              onChange={handleChangeServer}
              value={params.server}
              options={SERVER_LIST}
              className="h-10 p-0 bg-[#f5f8fa]"
              title={t("rent.rentService")}
            />
          </div>
          <div className="flex items-end">
            <Button className="bg-sky-500 hover:bg-sky-600 w-40 h-10">
              {t("rent.rentNow")}
            </Button>
          </div>
          <div className="flex items-end">
            <button className="text-[#50cd89] text-sm bg-[#e8fff3] px-6 py-3 rounded-sm flex gap-2 h-10 cursor-pointer hover:bg-[#50cd89] hover:text-white">
              <span className="svg-icon svg-icon-1x svg-icon-primary mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  ></path>
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
                </svg>
              </span>
              {t("rent.requestNewService")}
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-7 mb-8">
        <div className="gap-5">
          <div className="border-1 border-dashed !border-[#ffc700] bg-[#FFF8DE] p-3 rounded-sm text-sm ">
            <div className="bg-[#ffc700] rounded-sm text-white font-bold inline-block px-5 py-2 ">
              <div className="flex gap-5">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      opacity="0.3"
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="10"
                      fill="black"
                    ></rect>
                    <rect
                      x="11"
                      y="14"
                      width="7"
                      height="2"
                      rx="1"
                      transform="rotate(-90 11 14)"
                      fill="black"
                    ></rect>
                    <rect
                      x="11"
                      y="17"
                      width="2"
                      height="2"
                      rx="1"
                      transform="rotate(-90 11 17)"
                      fill="black"
                    ></rect>
                  </svg>
                </span>
                <span> Chú ý</span>
              </div>
            </div>
            <p className="text-[#5e6278] ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>

          <div className="mt-5">
            <h3 className="font-bold">{t("rent.waitList")}</h3>
          </div>

          <PhoneCopyComponent />
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
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Rent;
