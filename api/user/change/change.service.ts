import axiosLocal from "@/api/axiosLocal";
import { endpoints } from "@/api/endpoints";

export interface IChangePasswordBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export const changeService = {
  async changePassword(body: IChangePasswordBody) {
    const { data } = await axiosLocal.post(endpoints.user.changePassword, body);
    return data;
  },
  async changeKey() {
    const { data } = await axiosLocal.post(endpoints.user.changeKey);
    return data;
  },
};
