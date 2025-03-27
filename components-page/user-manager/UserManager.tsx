"use client";
import { managerService } from "@/api/user/manager/manager.service";
import { Card } from "@/components/ui/card";
import useObjectState from "@/hooks/use-object-state";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import ManagerUserTable from "./components/ManagerUserTable";
import UserManagerForm from "./components/UserManagerForm";
import CustomPagination from "@/components/table/CustomPagination";
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
    debugger
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

  const handleSizeChange = (size: number) => {
    setState({ params: { ...state.params, pageSize: size } });
  }

  const handleSelectChange = (values: any) => {
    setState({ params: { ...state.params, ...values } });
  };

  useEffect(() => {
    fetchData();
  }, [state.params]);

  return (
    <div className="max-w-[1120px] m-auto">
      <Card className="p-7 mb-8">
        <UserManagerForm
          value={state.params}
          handleSubmit={handleSelectChange}
        />
        <ManagerUserTable
          data={state.users}
          fetchData={fetchData}
        />
        <CustomPagination
          total={state.totalElements}
          pageSize={state.params.pageSize}
          setPageSize={handleSizeChange}
          pageNumber={state.params.pageNumber}
          setPageNumber={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default UserManager;
