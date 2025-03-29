import { managerService } from "@/api/user/manager/manager.service";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import UpdateUserModal from "./UpdateUserModal";
import { dateFormat } from "@/lib/useTime";
import { Pen } from "lucide-react";

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
          title: t("alert.success"),
          variant: "default",
        });
        fetchData();
      })
      .catch((error) => {
        toast({
          title: t("alert.error"),
          variant: "destructive",
        });
      });
  };

  const columns: ColumnDef<User>[] = [
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
      cell: ({ row }) => <>{dateFormat(row.getValue("creationDate"))}</>,
    },
    {
      accessorKey: "modificationDate",
      header: t("global.modificationDate"),
      cell: ({ row }) => <>{dateFormat(row.getValue("modificationDate"))}</>,
    },
    {
      accessorKey: "action",
      header: t("global.action"),
      cell: ({ row }) => (
        <Button
          className="bg-sky-500 hover:bg-sky-600 cursor-pointer"
          onClick={() => handleEditClick(row.original)}
        >
          <Pen />
        </Button>
      ),
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
