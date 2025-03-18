import Link from "next/link";
import React from "react";

export interface IPolicyContract {
  title: string;
  link: string;
}

const PolicyContract: React.FC<IPolicyContract> = ({ title, link }) => {
  return (
    <div className="border border-dashed border-[#2c3f5b] p-8 rounded-md">
      <p className="text-white text-[1.5rem] font-bold mb-2">{title}</p>
      <p className="text-[#5e6278] text-[1.25rem]">
        Liên hệ ngay Fanpage CSKH{" "}
        <Link href={link} className="text-[#fff] opacity-50">
          Fanpage ViOTP
        </Link>
      </p>
    </div>
  );
};
export default PolicyContract;
