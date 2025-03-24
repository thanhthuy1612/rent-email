import { z } from "zod";

const configSchema = z.object({
  DATABASE_URL: z.string(),
});

const configProject = configSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("Các giá trị khai báo trong file.env không hợp lệ");
}

const envConfig = configProject.data;
export default envConfig;
