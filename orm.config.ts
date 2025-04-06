import { z } from "zod";
import './envConfig.ts'

const configSchema = z.object({
  NEXT_PUBLIC_DATABASE_URL: z.string(),
  NEXT_PUBLIC_QR: z.string()
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL!,
  NEXT_PUBLIC_QR: process.env.NEXT_PUBLIC_QR!,
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("Các giá trị khai báo trong file.env không hợp lệ");
}

const envConfig = configProject.data;
export default envConfig;
