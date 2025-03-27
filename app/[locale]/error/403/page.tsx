"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { Hand } from "lucide-react";
import React from "react";

export default function Page() {
  const router = useRouter();
  return (
    <div className=" h-screen w-full flex flex-col gap-5 justify-center items-center">
      <div className="flex flex-col md:flex-row gap-20 justify-center items-center">
        <Hand className="bg-red-500 text-white rounded-full p-10 size-30" />
        <div className="flex flex-col gap-5">
          <p className="text-red-600 uppercase text-5xl">Forbidden</p>
          <p className="text-xl">403</p>
        </div>
      </div>
      <Button
        onClick={() => {
          router.push("/");
        }}
        className=" cursor-pointer"
      >
        Go Home
      </Button>
    </div>
  );
}
