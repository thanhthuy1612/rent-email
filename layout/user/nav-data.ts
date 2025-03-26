import { CircleDollarSign, Clock, Mail, User, Users } from "lucide-react";

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
    ],
  },
];
