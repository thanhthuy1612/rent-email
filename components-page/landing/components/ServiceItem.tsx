import { formatSortNumber } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import React from "react";

export interface IServiceItem {
  number: number;
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}
const ServiceItem: React.FC<IServiceItem> = ({ number, title, Icon }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="flex justify-center items-center h-[250px] w-[250px] m-3 bg-no-repeat bg-center bg-origin-content bg-landing"
        style={{ backgroundImage: "url('/imgs/octagon.svg')" }}
      >
        <div className="flex flex-col gap-1 items-center justify-center">
          <Icon className="text-white w-8 h-8" />
          <p className="text-[#fff] text-[1.8rem] mt-2 font-medium">
            {formatSortNumber(number)}
          </p>
          <p className="text-[#7e8299] font-medium text-[1rem]">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
