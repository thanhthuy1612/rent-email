"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

// ----------------------------------------------------------------------

export interface Props {
  header: string;
  url: string;
  success: string;
  fail: string;
  description: string;
  body?: string;
  type: string;
}
const ApiDocItem: React.FC<Props> = ({
  header,
  url,
  success,
  fail,
  description,
  body,
  type,
}) => {
  const t = useTranslations();

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: t("alert.success"),
        description: t("partner.copySuccess"),
        className: cn(
          "top-0 right-0 flex fixed max-w-1/2 md:max-w-[420px] top-4 right-4"
        ),
      });
    } catch (err) {
      toast({
        title: t("alert.error"),
        description: t("partner.copyFailed"),
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed max-w-1/2 md:max-w-[420px] top-4 right-4"
        ),
      });
    }
  };
  const renderButtonCopy = (value: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              handleCopy(value);
            }}
            variant="outline"
            className="!px-2 bg-transparent cursor-pointer"
          >
            <Copy />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const renderType = () => {
    if (type === "POST") {
      return (
        <Card className="px-4 rounded-md py-2 m-0 font-bold bg-green-500 border-green-50 text-white">
          POST
        </Card>
      );
    }
    if (type === "GET") {
      return (
        <Card className="px-4 rounded-md py-2 m-0 font-bold bg-blue-500 border-blue-500 text-white">
          GET
        </Card>
      );
    }
  };
  return (
    <Card className="py-0 px-5 m-0">
      <Accordion
        type="single"
        defaultValue={header}
        collapsible
        className="w-full"
      >
        <AccordionItem value={header}>
          <AccordionTrigger className="uppercase font-bold">
            {header}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              {renderType()}
              <span className="font-bold">{url}</span>
            </div>
            {description && (
              <div className="text-red-500">
                <span className="font-bold">{description}</span>
              </div>
            )}
            {body && (
              <>
                <p>Body:</p>
                <Card className="p-4 mt-2 bg-gray-50 border-gray-500 text-gray-500">
                  <div className=" relative">
                    <pre>{body}</pre>
                    <div className=" absolute right-0 top-0">
                      {renderButtonCopy(body)}
                    </div>
                  </div>
                </Card>
              </>
            )}
            <p className="mt-2 text-green-500">Thành công:</p>
            <Card className="p-4 mt-2 bg-green-50 border-green-500 text-green-500">
              <div className=" relative">
                <pre>{success}</pre>
                <div className=" absolute right-0 top-0">
                  {renderButtonCopy(success)}
                </div>
              </div>
            </Card>
            <p className="mt-2 text-red-500">Thất bại:</p>
            <Card className="p-4 mt-2 bg-red-50 border-red-500 text-red-500">
              <div className=" relative">
                <pre>{fail}</pre>
                <div className=" absolute right-0 top-0">
                  {renderButtonCopy(fail)}
                </div>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
export default ApiDocItem;
