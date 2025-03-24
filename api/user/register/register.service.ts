import axiosLocal from "@/api/axiosLocal";
import { endpoints } from "@/api/endpoints";

export interface IRegisterBody {
  userName: string;
  password: string;
  captchaId: string;
  captchaCode: string;
}
export const registerService = {
  async getCaptcha() {
    const { data } = await axiosLocal.post(endpoints.user.register.getCaptcha);
    return data;
  },
  async register(body: IRegisterBody) {
    const { data } = await axiosLocal.post(endpoints.user.register.post, body);
    return data;
  },
};
