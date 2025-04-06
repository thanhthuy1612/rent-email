import { z } from "zod";
import './envConfig.ts'

const configSchema = z.object({
  NEXT_PUBLIC_DATABASE_URL: z.string(),
  NEXT_PUBLIC_QR: z.string()
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_DATABASE_URL: "http://api.ch-otp.top/api/v1",
  NEXT_PUBLIC_QR: "https://img.vietqr.io/image/MB-3550101013333-qr_only.png",
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("Các giá trị khai báo trong file.env không hợp lệ");
}

const envConfig = configProject.data;
export default envConfig;
