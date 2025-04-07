import introduce1 from "@/public/imgs/intrduce1.webp";
import introduce2 from "@/public/imgs/intrduce2.webp";
import introduce3 from "@/public/imgs/intrduce3.webp";
import { ChartPie, Grid, ShoppingBasket } from "lucide-react";

export const introduce = [
  {
    id: 1,
    title: "Đăng ký tài khoản",
    description:
      "Chỉ với vài thao tác đơn giản khách hàng đã có thể sở hữu tài khoản của CHOTP",
    img: introduce1,
  },
  {
    id: 2,
    title: "Nạp tiền vào tài khoản",
    description:
      "CHOTP cung cấp phương thức nạp tiền vào tài khoản Internet Banking",
    img: introduce2,
  },
  {
    id: 3,
    title: "Sử dụng dịch vụ",
    description:
      "Chỉ cần vài thao tác khách hàng đã có thể thuê email và sử dụng ngay",
    img: introduce3,
  },
];

export const service = [
  { icon: Grid, number: 300000000, title: "Sim đang có sẵn trong kho" },
  { icon: ChartPie, number: 200000, title: "Khách hàng thường xuyên" },
  { icon: ShoppingBasket, number: 100, title: "Nhà cung cấp sim toàn châu á" },
];

export const policy = [
  { title: "Bạn cần sử dụng API?", link: "https://www.facebook.com/vietotp" },
  {
    title: "Bạn muốn hợp tác kinh doanh?",
    link: "https://www.facebook.com/vietotp",
  },
];

export const contact = [
  { title: "Facebook", link: "https://www.facebook.com/vietotp" },
  {
    title: "Telegram",
    link: "https://www.facebook.com/vietotp",
  },
  {
    title: "Email: admin@CHOTP.com",
    link: "https://www.facebook.com/vietotp",
  },
];
