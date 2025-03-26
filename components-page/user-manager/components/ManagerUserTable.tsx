import { managerService } from "@/api/user/manager/manager.service";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Edit } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { PaginationDemo } from "./Pagination";
import UpdateUserModal from "./UpdateUserModal";

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

interface Params {
  page: number;
  size: number;
}

interface ManagerUserTableProps {
  data: User[];
  params: Params;
  total: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  fetchData: () => void;
}

const ManagerUserTable: React.FC<ManagerUserTableProps> = ({
  data,
  params,
  total,
  loading,
  onPageChange,
  fetchData,
}) => {
  const t = useTranslations();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = (data: any) => {
    managerService
      .updateUser(data)
      .then(() => {
        handleModalClose();
        toast({
          title: "Update success!",
          variant: "default",
        });
        fetchData();
      })
      .catch((error) => {
        toast({
          title: "Update fail!",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>{t("global.action")}</TableHead>
            <TableHead>{t("global.userName")}</TableHead>
            <TableHead>{t("global.balance")}</TableHead>
            <TableHead>{t("global.email")}</TableHead>
            <TableHead>{t("global.apiToken")}</TableHead>
            <TableHead>{t("global.scopes")}</TableHead>
            <TableHead>{t("global.status")}</TableHead>
            <TableHead>{t("global.isDeleted")}</TableHead>

            <TableHead>{t("global.creationDate")}</TableHead>
            <TableHead>{t("global.modificationDate")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {params.page * params.size + index + 1}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick(user)}>
                  <Edit />
                </Button>
              </TableCell>

              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.balance}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.apiToken}</TableCell>
              <TableCell>{user.scopes}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                {user.isDeleted ? t("global.yes") : t("global.no")}
              </TableCell>
              <TableCell>{user.creationDate}</TableCell>
              <TableCell>{user.modificationDate}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationDemo
        total={total}
        current={params.page}
        onChange={onPageChange}
      />{" "}
      {selectedUser && (
        <UpdateUserModal
          userId={selectedUser.id}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
};

export default ManagerUserTable;
