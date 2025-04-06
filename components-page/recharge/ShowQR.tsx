"use client";

import { useTranslations } from "next-intl";
import React from "react";
import QRForm from "./components/QRForm";

export interface IQR {
  amount: number;
  description: string;
}
const ShowQR: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string>("");
  const t = useTranslations();

  const handleSubmit = (value: IQR) => {
    const qrUrl = "https://img.vietqr.io/image/MB-3550101013333-qr_only.png";
    setQrCodeUrl(
      `${qrUrl}?amount=${value.amount}&addInfo=${value.description}`
    );
  };

  return (
    <div className="flex items-center flex-col">
      <div className="w-full">
        <h3 className="font-bold mb-5">Tạo QR nạp tiền</h3>
        <QRForm handleSubmit={handleSubmit} />
      </div>
      {qrCodeUrl && (
        <>
          <div className="bg-[aliceblue] mt-5 w-120 h-20 flex items-center justify-center rounded-xl mb-5">
            <h2 className="font-bold text-center">{t("recharge.scanHere")}</h2>
          </div>
          <div className="w-50 h-50">
            <img
              alt="123"
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              src={qrCodeUrl}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShowQR;
