import axiosLocal from "@/api/axiosLocal";
import { endpoints } from "@/api/endpoints";

interface ISearchParams {
  pageNumber: number;
  pageSize: number;
  searchUsername: string;
  statuses: number[];
}

export const managerService = {
  async getAll(params: ISearchParams) {
    const { data } = await axiosLocal.post(endpoints.manager.getAll, params);
    return data;
  },
  async updateUser(body: any) {
    const { data } = await axiosLocal.post(endpoints.manager.updateUser, body);
    return data;
  },
};
