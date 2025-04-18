import { Card } from "@/components/ui/card";
import React from "react";
import ShowQR from "./ShowQR";
import History from "./History";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// ----------------------------------------------------------------------

const Recharge: React.FC = () => {
  const t = useTranslations();

  return (
    <div className=" flex flex-col gap-6 mx-5">
      {/* <Card className="p-5">
        <ShowQR />
      </Card> */}
      <Card className="p-5 border-amber-500 text-amber-600 gap-2 border-dashed bg-amber-50">
        <h3 className="font-bold">Nạp tiền</h3>
        <div>Liên hệ admin</div>
        <div>
          Telegram:{" "}
          <Link
            href="https://t.me/trumbm"
            className=" cursor-pointer underline text-amber-700 hover:text-amber-800"
          >
            @trumbm
          </Link>
        </div>
      </Card>
      <History />
    </div>
  );
};
export default Recharge;
