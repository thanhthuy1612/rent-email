import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";

const ShowQR: React.FC = () => {
  const t = useTranslations();
  const qrCodeUrl = process.env.NEXT_PUBLIC_QR ?? "";

  return (
    <div className="flex items-center flex-col">
      <div className="bg-[aliceblue] w-120 h-20 flex items-center justify-center rounded-xl mb-5">
        <h2 className="font-bold text-center">{t("recharge.scanHere")}</h2>
      </div>
      <div className="w-50 h-50">
        <img
          alt="123"
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          src={qrCodeUrl}
        />
      </div>
    </div>
  );
};

export default ShowQR;
