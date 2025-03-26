import { Card } from "@/components/ui/card";
import React from "react";
import ShowQR from "./ShowQR";
import History from "./History";

// ----------------------------------------------------------------------

const Recharge: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mx-5">
      <Card className="p-5">
        <ShowQR
          value={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
          }
        />
      </Card>

      <Card className="p-5 mb-8">
        <History />
      </Card>
    </div>
  );
};
export default Recharge;
