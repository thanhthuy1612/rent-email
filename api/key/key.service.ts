import axiosLocal from "@/api/axiosLocal";
import { endpoints } from "@/api/endpoints";

export interface ITransactionBody {
  pageNumber: number;
  pageSize: number;
  key: string;
  from: Date;
  to: Date;
  types: number[];
  statuses: number[];
  dateAsc: boolean;
}

export interface IRequestBody {
  pageNumber: 0;
  pageSize: 0;
  key: string;
  from: Date;
  to: Date;
  services: string[];
  statuses: number[];
  dateAsc: true;
}

export const keyService = {
  async getRequest(body: IRequestBody) {
    const { data } = await axiosLocal.post(endpoints.key.getRequest, body);
    return data;
  },
  async getTransaction(body: ITransactionBody) {
    const { data } = await axiosLocal.post(endpoints.key.getTransaction, body);
    return data;
  },
};
