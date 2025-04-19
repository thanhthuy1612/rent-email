import {
  Banknote,
  CircleDollarSign,
  Mail,
  Menu,
  MoveDown,
  Server,
  User,
  UserCheck,
  Users,
  File
} from "lucide-react";

export const navData = [
  {
    label: "Tài khoản",
    children: [
      {
        title: "Thông tin tài khoản",
        url: "/user",
        icon: User,
      },
      {
        title: "Nạp tiền",
        url: "/recharge",
        icon: CircleDollarSign,
      },
    ],
  },
  {
    label: "Cho thuê",
    children: [
      {
        title: "Thuê email",
        url: "/rent",
        icon: Mail,
      },
      {
        title: "API Doc",
        url: "/api-doc",
        icon: File,
      },
    ],
  },
  {
    label: "Quản lý",
    children: [
      {
        title: "Người dùng",
        url: "/manager",
        icon: Users,
      },
      {
        title: "Dịch vụ",
        url: "/service",
        icon: Server,
      },
      {
        title: "Đối tác",
        url: "/partner",
        icon: UserCheck,
      },
      {
        title: "Nạp tiền",
        url: "/admin-recharge",
        icon: Banknote,
      },
      {
        title: "Thuê email",
        url: "/admin-request",
        icon: Menu,
      },
      {
        title: "Mã giảm giá",
        url: "/discount",
        icon: MoveDown,
      },
    ],
  },
];
