import { managerService } from "@/api/user/manager/manager.service";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
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
  fetchData: () => void;
}

const ManagerUserTable: React.FC<ManagerUserTableProps> = ({
  data,
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

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "action",
      header: t("global.action"),
      cell: ({ row }) => (
        <Button onClick={() => handleEditClick(row.original)}>
          <Edit />
        </Button>
      ),
    },
    {
      accessorKey: "userName",
      header: t("global.userName"),
    },
    {
      accessorKey: "balance",
      header: t("global.balance"),
    },
    {
      accessorKey: "email",
      header: t("global.email"),
    },
    {
      accessorKey: "apiToken",
      header: t("global.apiToken"),
    },
    {
      accessorKey: "scopes",
      header: t("global.scopes"),
    },
    {
      accessorKey: "status",
      header: t("global.status"),
    },
    {
      accessorKey: "isDeleted",
      header: t("global.isDeleted"),
      cell: ({ row }) => (
        <>{row.original.isDeleted ? t("global.yes") : t("global.no")}</>
      ),
    },
    {
      accessorKey: "creationDate",
      header: t("global.creationDate"),
    },
    {
      accessorKey: "modificationDate",
      header: t("global.modificationDate"),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />

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
