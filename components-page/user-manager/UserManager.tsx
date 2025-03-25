"use client";
import { managerService } from "@/api/user/manager/manager.service";
import { Card } from "@/components/ui/card";
import useObjectState from "@/hooks/use-object-state";
import { useTranslations } from "next-intl";
import ManagerUserTable from "./components/ManagerUserTable";
import { useEffect } from "react";
import { set } from "date-fns";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/select/CustomSelect";
import { STATUS_LIST } from "@/constants/select";
interface User {
  id: string;
  userName: string;
  balance: number;
  email: string;
  apiToken: string;
  scopes: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  isDeleted: boolean;
}

interface ISearchParams {
  pageNumber: number;
  pageSize: number;
  searchUsername: string;
  statuses: number[];
}

interface State {
  users: User[];
  params: ISearchParams;
  loading: boolean;
  totalElements: number;
}
const UserManager: React.FC = () => {
  const [state, setState] = useObjectState<State>({
    users: [],
    params: {
      pageNumber: 1,
      pageSize: 10,
      searchUsername: "",
      statuses: [],
    },
    loading: false,
    totalElements: 0,
  });

  const t = useTranslations();

  const fetchData = () => {
    setState({ loading: true });

    managerService
      .getAll(state.params)
      .then((data) => {
        setState({ users: data.data.data, totalElements: data.data.total });
      })
      .catch((error) => {
        console.error("Error during fetching data:", error);
      })
      .finally(() => {
        {
          setState({ loading: false });
        }
      });
  };

  const handlePageChange = (page: number) => {
    setState({ params: { ...state.params, pageNumber: page } });
  };

  const handleSelectChange = (value: any) => {
    setState({ params: { ...state.params, statuses: value } });
  };

  const handleChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ params: { ...state.params, searchUsername: e.target.value } });
  };

  useEffect(() => {
    fetchData();
  }, [state.params]);

  return (
    <div className="max-w-[1120px] m-auto">
      <Card className="p-7 mb-8">
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-2">
            <Input
              placeholder="Tìm theo tên"
              onChange={handleChangeInputName}
            />
          </div>
          <div className="col-span-2 h-10">
            <CustomSelect
              options={STATUS_LIST}
              value={state.params.statuses}
              onChange={handleSelectChange}
              className="h-10"
            />
          </div>
        </div>
      </Card>
      <Card className="p-7 mb-8">
        <ManagerUserTable
          data={state.users}
          params={{
            page: state.params.pageNumber,
            size: state.params.pageSize,
          }}
          total={state.totalElements}
          loading={state.loading}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default UserManager;
