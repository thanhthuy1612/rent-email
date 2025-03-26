import {
  Banknote,
  CircleDollarSign,
  Clock,
  Mail,
  Menu,
  Server,
  User,
  UserCheck,
  Users,
} from "lucide-react";

export const navData = [
  {
    label: "Account",
    children: [
      {
        title: "Account Information",
        url: "/user",
        icon: User,
      },
      {
        title: "Recharge",
        url: "/recharge",
        icon: CircleDollarSign,
      },
    ],
  },
  {
    label: "Rent",
    children: [
      {
        title: "Rent Gmail",
        url: "/rent",
        icon: Mail,
      },
    ],
  },
  {
    label: "Manager",
    children: [
      {
        title: "User",
        url: "/manager",
        icon: Users,
      },
      {
        title: "Service",
        url: "/service",
        icon: Server,
      },
      {
        title: "Partner",
        url: "/partner",
        icon: UserCheck,
      },
      {
        title: "Recharge",
        url: "/admin-recharge",
        icon: Banknote,
      },
      {
        title: "Request",
        url: "/admin-request",
        icon: Menu,
      },
      {
        title: "Discount",
        url: "/discount",
        icon: Menu,
      },
    ],
  },
];
