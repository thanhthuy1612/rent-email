import { Card } from "@/components/ui/card";
import React from "react";
import ShowQR from "./ShowQR";
import History from "./History";

// ----------------------------------------------------------------------

const Recharge: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mx-10">
      <Card className="p-10 mb-8 col-span-1">
        <ShowQR
          value={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
          }
        />
      </Card>

      <Card className="p-10 mb-8 col-span-2">
        <History />
      </Card>
    </div>
  );
};
export default Recharge;
