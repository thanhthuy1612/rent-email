import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IntroduceItemProps {
  index: number;
  title: string;
  img: string | StaticImport;
  description: string;
  className: string;
}

const IntroduceItem: React.FC<IntroduceItemProps> = ({
  img,
  index,
  title,
  description,
  className,
}) => {
  return (
    <div className={className}>
      <Image
        src={img}
        alt="download-img"
        className="h-[100%] object-cover max-h-[125px] w-auto mb-9"
      />
      <div className="flex gap-3 items-center justify-center">
        <p className="bg-green-100 text-green-500 py-2 px-4 font-semibold rounded-full">
          {index}
        </p>
        <p className="text-[#181c32] text-[1.35rem] font-bold">{title}</p>
      </div>
      <p className="font-medium mt-4 px-12 text-[#a1a5b7] text-[1.15rem] text-center">
        {description}
      </p>
    </div>
  );
};
export default IntroduceItem;
