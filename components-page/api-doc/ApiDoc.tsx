import React from "react";
import ApiDocItem from "./components/ApiDocItem";

// ----------------------------------------------------------------------

const ApiDoc: React.FC = () => {
  const listApi2 = [
    {
      header: "Thuê email mới",
      description: "",
      url: "https://ch-otp.top:50521/api/v1/key/request/get-new-email",
      success: `{
  "data": {
    "id": string,
    "email": string,
    "serviceName": string,
    "price": number
  },
  "code": 0,
  "message" string
}`,
      fail: `{
  "data": {
    "id": string,
    "email": string,
    "serviceName": string,
    "price": number
  },
  "code": 1,
  "message": string
}`,
      body: `{
  "key": string,
  "serviceName": string
}`,
      type: "POST",
    },
    {
      header: "Lấy code",
      description:
        "Lưu ý: Code không tự đồng bộ từ email về. Bạn cần gọi API này nếu chưa nhận được code (đối với các email có trạng thái là Created). Nếu sau 1 tiếng vẫn chưa nhận code, hệ thống sẽ tự quét lần cuối, nếu không có code thì request sẽ timeout và hoàn tiền.",
      url: "https://ch-otp.top:50521/api/v1/key/request/get-email-code",
      success: `{
  "data": {
    "email": string,
    "code": string,
    "status": string
  },
  "code": 0,
  "message": string
}`,
      fail: `{
  "data": {
    "email": string,
    "code": string,
    "status": string
  },
  "code": 1,
  "message": string
}`,
      body: `{
  "key": string,
  "requestId": string
}`,
      type: "POST",
    },
    {
      header: "Lịch sử thuê email",
      description: "",
      url: "https://ch-otp.top:50521/api/v1/key/request/get-history",
      success: `{
  "data": {
    "pageSize": number,
    "pageNumber": number,
    "total": number,
    "hasMore": true,
    "data": [
      {
        "id": string,
        "userId": string,
        "userName": string,
        "serviceName": string,
        "originalPrice": number,
        "discount": number,
        "finalPrice": number,
        "refund": true,
        "email": string,
        "code": string,
        "status": number,
        "creationDate": Date,
        "modificationDate": Date
      }
    ],
    "successCount": number,
    "createdCount": number,
    "timeoutCount": number,
    "cancelCount": number,
    "totalSpent": number,
    "totalRefund": number
  },
  "code": 0,
  "message": string
}`,
      fail: `{
  "data": null,
  "code": 1,
  "message": string
}`,
      body: `{
  "pageNumber": number,
  "pageSize": number,
  "key": string,
  "from": Date,
  "to": Date,
  "services": [
    string
  ],
  "statuses": [
    0
  ],
  "dateAsc": true
}`,
      type: "POST",
    },
    {
      header: "Kiểm tra số dư",
      description: "",
      url: "https://ch-otp.top:50521/api/v1/key/user/balance",
      success: `{
  "data": number,
  "code": 0,
  "message": string
}`,
      fail: `{
  "data": null,
  "code": 1,
  "message": string
}`,
      body: `{
  "key": string
}`,
      type: "POST",
    },
    {
      header: "Danh sách dịch vụ",
      description: "",
      url: "https://ch-otp.top:50521/api/v1/key/service/active-services",
      success: `{
  "data": [
    {
      "name": string,
      "mailType": 1,
      "price": number,
      "discount": number,
      "description": string,
      "creationDate": Date,
      "modificationDate": Date,
      "isDeleted": true
    }
  ],
  "code": 0,
  "message": string
}`,
      fail: `{
  "data": null,
  "code": 1,
  "message": string
}`,
      body: `{
  "key": string
}`,
      type: "POST",
    },
    {
      header: "Lịch sử nạp",
      description: "",
      url: "https://ch-otp.top:50521/api/v1/key/transaction/get-history",
      success: `{
  "data": {
    "pageSize": number,
    "pageNumber": number,
    "total": number,
    "hasMore": true,
    "data": [
      {
        "id": string,
        "userId": string,
        "userName": string,
        "amount": number,
        "promotion": number,
        "finalAmount": number,
        "balanceBefore": number,
        "balanceAfter": number,
        "type": 1,
        "transCode": string,
        "description": string,
        "status": number,
        "creationDate": Date,
        "modificationDate": Date
      }
    ],
    "totalDebit": number,
    "totalCredit": 0
  },
  "code": 0,
  "message": string
}`,
      fail: `{
  "data": null,
  "code": 1,
  "message": string
}`,
      body: `{
  "pageNumber": number,
  "pageSize": number,
  "key": string,
  "from": Date,
  "to": Date,
  "types": [
    1
  ],
  "statuses": [
    0
  ],
  "dateAsc": true
}`,
      type: "POST",
    },
  ];
  return (
    <div className="m-5">
      <h1 className="text-3xl color-primary">Tài liệu Api CH-OTP.com</h1>
      <div className="mt-5 flex flex-col gap-5">
        {listApi2.map((item) => (
          <ApiDocItem key={item.header} {...item} />
        ))}
      </div>
    </div>
  );
};
export default ApiDoc;
