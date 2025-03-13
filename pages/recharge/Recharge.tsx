"use client";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import ShowQR from "./ShowQR";
import History from "./History";

// ----------------------------------------------------------------------

const Recharge: React.FC = () => {
  const [state, setState] = useState({
    rechargeTypes: [
      {
        label: "Momo",
        value: "momo",
      },
      {
        label: "Bank",
        value: "bank",
      },
    ],
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-10">
      <Card className="p-10 mb-8 col-span-1">
        <ShowQR
          value={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
          }
        />
      </Card>

      <Card className="p-10 mb-8 col-span-2">
        <History rechargeTypes={state.rechargeTypes} />
      </Card>
    </div>
  );
};
export default Recharge;
