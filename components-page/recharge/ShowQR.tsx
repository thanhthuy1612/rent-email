import { useTranslations } from "next-intl";
import React from "react";
import QRCode from "react-qr-code";

interface ShowQRProps {
  value: string;
}

const ShowQR: React.FC<ShowQRProps> = ({ value }) => {
  const t = useTranslations();

  return (
    <div className="flex items-center flex-col">
      <div className="bg-[aliceblue] w-120 h-20 flex items-center justify-center rounded-xl mb-5">
        <h2 className="font-bold text-center">{t("recharge.scanHere")}</h2>
      </div>
      <div className="w-50 h-50">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};

export default ShowQR;
