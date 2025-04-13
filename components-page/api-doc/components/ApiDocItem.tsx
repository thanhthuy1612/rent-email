import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import React from "react";

// ----------------------------------------------------------------------

export interface Props {
  header: string;
  url: string;
  susscess: string;
  fail: string;
  description: string;
  body?: string;
  authen: boolean;
  type: string;
}
const ApiDocItem: React.FC<Props> = ({
  header,
  url,
  susscess,
  fail,
  description,
  body,
  authen,
  type,
}) => {
  const renderType = () => {
    if (type === "POST") {
      return (
        <Card className="px-4 py-2 m-0 font-bold bg-green-500 border-green-50 text-white">
          POST
        </Card>
      );
    }
    if (type === "GET") {
      return (
        <Card className="px-4 py-2 m-0 font-bold bg-blue-500 border-blue-500 text-white">
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
          <AccordionTrigger>{header}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              {renderType()}
              <span className="font-bold">{url}</span>
            </div>
            <p>
              Mô tả: <span className="font-bold">{description}</span>
            </p>
            <p>
              Authentication:{" "}
              <span className="font-bold">{authen ? "Có" : "Không"}</span>
            </p>
            {body && (
              <>
                <p>Body:</p>
                <Card className="p-4 mt-2 bg-gray-50 border-gray-500 text-gray-500">
                  {body}
                </Card>
              </>
            )}
            <p className="mt-2 text-green-500">Thành công:</p>
            <Card className="p-4 mt-2 bg-green-50 border-green-500 text-green-500">
              {susscess}
            </Card>
            <p className="mt-2 text-red-500">Thất bại:</p>
            <Card className="p-4 mt-2 bg-red-50 border-red-500 text-red-500">
              {fail}
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
export default ApiDocItem;
