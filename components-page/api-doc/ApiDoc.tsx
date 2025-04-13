import React from "react";
import ApiDocItem from "./components/ApiDocItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ----------------------------------------------------------------------

const ApiDoc: React.FC = () => {
  const listApi1 = [
    {
      header: "Lấy captcha",
      description: "Captcha kiểm tra có phải con người không?",
      url: "/api/v1/web/user/get-captcha",
      susscess: `{ "data": { "base64": "string", "captchaId": "string"}, "code": 0, "message": "string" }`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      authen: false,
      type: "POST",
    },
    {
      header: "Đăng nhập",
      description: "Đăng nhập vào trang web",
      url: "/api/v1/web/user/login",
      susscess: `{ "data": { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "userName": "string", "balance": 0, "email": "string", "apiToken": "string", "scopes": "string", "creationDate": "2025-04-13T16:59:02.358Z", "modificationDate": "2025-04-13T16:59:02.358Z", "accessToken": "string", "refreshToken": "string" }, "code": 0, "message": "string" }`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      authen: false,
      body: `{ "userName": "string", "password": "stringst", "captchaId": "string", "captchaCode": "string" }`,
      type: "POST",
    },
    {
      header: "Đăng ký",
      description: "Đăng ký tài khoản",
      url: "/api/v1/web/user/register",
      susscess: `{ "data": { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6", "userName": "string", "balance": 0, "email": "string", "apiToken": "string", "scopes": "string", "creationDate": "2025-04-13T16:59:02.358Z", "modificationDate": "2025-04-13T16:59:02.358Z", "accessToken": "string", "refreshToken": "string" }, "code": 0, "message": "string" }`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      authen: false,
      body: `{ "userName": "string", "password": "stringst", "email": "user@example.com", "captchaId": "string", "captchaCode": "string" }`,
      type: "POST",
    },
  ];

  const listApi2 = [
    {
      header: "Danh sách email mới",
      description: "",
      url: "/api/v1/key/request/get-new-email",
      susscess: `{ "data": { "email": "string", "serviceName": "string", "price": 0 }, "code": 0, "message": "string" }`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      body: `{ "key": "string", "serviceName": "string" }`,
      authen: true,
      type: "POST",
    },
    {
      header: "Thuê email",
      description: "",
      url: "/api/v1/key/request/get-email-code",
      susscess: `{ "data": { "email": "string", "code": "string", "status": 0 }, "code": 0, "message": "string" }`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      body: `{ "key": "string", "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }`,
      authen: true,
      type: "POST",
    },
    {
      header: "Lịch sử",
      description: "",
      url: "/api/v1/key/request/get-history",
      susscess: `{ "data": { "pageSize": 0, "pageNumber": 0, "total": 0, "hasMore": true, "data": [{ "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userName": "string",
        "serviceName": "string",
        "originalPrice": 0,
        "discount": 0,
        "finalPrice": 0,
        "refund": true,
        "email": "string",
        "code": "string",
        "status": 0,
        "creationDate": "2025-04-13T17:15:16.795Z",
        "modificationDate": "2025-04-13T17:15:16.795Z"
      }
    ],
    "successCount": 0,
    "createdCount": 0,
    "timeoutCount": 0,
    "cancelCount": 0,
    "totalSpent": 0,
    "totalRefund": 0 }, "code": 0, "message": "string" }`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      body: `{
  "pageNumber": 0,
  "pageSize": 0,
  "key": "string",
  "from": "2025-04-13T17:15:15.125Z",
  "to": "2025-04-13T17:15:15.125Z",
  "services": [
    "string"
  ],
  "statuses": [
    0
  ],
  "dateAsc": true
}`,
      authen: true,
      type: "POST",
    },
    {
      header: "Số dư",
      description: "",
      url: "/api/v1/key/user/balance",
      susscess: `{ "data": 0, "code": 0, "message": "string" }`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      body: `{ "key": "string" }`,
      authen: true,
      type: "POST",
    },
    {
      header: "Danh sách dịch vụ người dùng",
      description: "",
      url: "/api/v1/key/service/active-services",
      susscess: `{
  "data": [
    {
      "name": "string",
      "mailType": 1,
      "price": 0,
      "discount": 0,
      "description": "string",
      "creationDate": "2025-04-13T17:18:21.435Z",
      "modificationDate": "2025-04-13T17:18:21.435Z",
      "isDeleted": true
    }
  ],
  "code": 0,
  "message": "string"
}`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      body: `{ "key": "string" }`,
      authen: true,
      type: "POST",
    },
    {
      header: "Lich sử giao dịch",
      description: "",
      url: "/api/v1/key/transaction/get-history",
      susscess: `{
  "data": {
    "pageSize": 0,
    "pageNumber": 0,
    "total": 0,
    "hasMore": true,
    "data": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userName": "string",
        "amount": 0,
        "promotion": 0,
        "finalAmount": 0,
        "balanceBefore": 0,
        "balanceAfter": 0,
        "type": 1,
        "transCode": "string",
        "description": "string",
        "status": 0,
        "creationDate": "2025-04-13T17:21:24.960Z",
        "modificationDate": "2025-04-13T17:21:24.960Z"
      }
    ],
    "totalDebit": 0,
    "totalCredit": 0
  },
  "code": 0,
  "message": "string"
}`,
      fail: `{ "data": null, "code": 1, "message": string }`,
      body: `{
  "pageNumber": 0,
  "pageSize": 0,
  "key": "string",
  "from": "2025-04-13T17:20:13.991Z",
  "to": "2025-04-13T17:20:13.991Z",
  "types": [
    1
  ],
  "statuses": [
    0
  ],
  "dateAsc": true
}`,
      authen: true,
      type: "POST",
    },
  ];
  return (
    <div className="m-5">
      <h1 className="text-3xl color-primary">
        Hướng dẫn sử dụng api IPv4 xoay CH-OTP.com
      </h1>
      <Accordion type="multiple" defaultValue={["1", "2"]} className="w-full">
        <AccordionItem value="2">
          <AccordionTrigger>KEY BASED AUTHENTICATION API</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            {listApi2.map((item) => (
              <ApiDocItem key={item.header} {...item} />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="1">
          <AccordionTrigger>WEB API</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            {listApi1.map((item) => (
              <ApiDocItem key={item.header} {...item} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default ApiDoc;
