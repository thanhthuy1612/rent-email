import axiosLocal from "@/api/axiosLocal";
import { endpoints } from "@/api/endpoints";

export interface ILoginBody {
  userName: string;
  password: string;
  captchaId: string;
  captchaCode: string;
}
export const loginService = {
  async getCaptcha() {
    const { data } = await axiosLocal.post(endpoints.user.login.getCaptcha);
    return data;
  },
  async login(body: ILoginBody) {
    const { data } = await axiosLocal.post(endpoints.user.login.post, body);
    return data;
  },
  async profile() {
    const { data } = await axiosLocal.post(endpoints.user.login.profile);
    return data;
  },
};
