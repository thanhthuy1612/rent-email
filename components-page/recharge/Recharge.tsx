import { Card } from "@/components/ui/card";
import React from "react";
import ShowQR from "./ShowQR";
import History from "./History";
import { useTranslations } from "next-intl";

// ----------------------------------------------------------------------

const Recharge: React.FC = () => {
  const t = useTranslations();

  return (
    <div className="max-w-[1120px] flex flex-col gap-6 mx-5">
      <Card className="p-5">
        <ShowQR value={t("recharge.qrDescription")} />
      </Card>

      <History />
    </div>
  );
};
export default Recharge;
