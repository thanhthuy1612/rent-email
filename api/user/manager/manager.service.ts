import axiosLocal from "@/api/axiosLocal";
import { endpoints } from "@/api/endpoints";

export interface ISearchParams {
  pageNumber?: number;
  pageSize?: number;
  searchUsername?: string;
  statuses?: number[];
}

export interface IServiceBody {
  name: string;
  price: number;
  discount: number;
  description: string;
  partnerName: string;
  isDeleted: boolean;
}

export interface IPartnerBody {
  name: string;
  apiKey: string;
  baseUrl: string;
  configurations: string;
  priority: number;
  isDeleted: boolean;
}

export interface IRequest {
  pageNumber: number;
  pageSize: number;
  from?: Date;
  to?: Date;
  services: string[];
  statuses: number[];
  userIds?: string[];
  dateAsc: boolean;
}
export interface ITransaction {
  pageNumber: number;
  pageSize: number;
  from?: Date;
  to?: Date;
  types: number[];
  statuses: number[];
  userIds: string[];
  dateAsc: boolean;
}

interface TDiscount {
  promotion: number;
  startTime: Date;
  endTime: Date;
  isDeleted: boolean;
}

export const managerService = {
  async getAll(params: ISearchParams) {
    const { data } = await axiosLocal.post(endpoints.manager.getAll, params);
    return data;
  },
  async updateUser(body: any) {
    const { data } = await axiosLocal.post(endpoints.manager.updateUser, body);
  },
  async getService() {
    const { data } = await axiosLocal.get(endpoints.manager.getService);
    return data;
  },
  async updateService(body: IServiceBody) {
    const { data } = await axiosLocal.post(
      endpoints.manager.updateService,
      body
    );
    return data;
  },
  async getPartner() {
    const { data } = await axiosLocal.get(endpoints.manager.getPartner);
    return data;
  },
  async updatePartner(body: IPartnerBody) {
    const { data } = await axiosLocal.post(
      endpoints.manager.updatePartner,
      body
    );
    return data;
  },
  async getRequest(body: IRequest) {
    const { data } = await axiosLocal.post(endpoints.manager.getRequest, body);
    return data;
  },
  async getTransaction(body: ITransaction) {
    const { data } = await axiosLocal.post(
      endpoints.manager.getTransaction,
      body
    );
    return data;
  },
  async getDiscount() {
    const { data } = await axiosLocal.get(endpoints.manager.getDiscount);
    return data;
  },
  async updateDiscount(body: TDiscount) {
    const { data } = await axiosLocal.post(
      endpoints.manager.updateDiscount,
      body
    );
    return data;
  },
};
