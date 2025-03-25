import { CircleDollarSign, Clock, Mail, User } from "lucide-react";

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
      {
        title: "Rent History",
        url: "/history",
        icon: Clock,
      },
      {
        title: "User",
        url: "/manager",
        icon: User,
      },
    ],
  },
];
