import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import React from "react";
import { PaginationDemo } from "./Pagination";

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
}

const ManagerUserTable: React.FC<ManagerUserTableProps> = ({
  data,
  params,
  total,
  loading,
  onPageChange,
}) => {
  const t = useTranslations();

  return (
    <>
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>{t("global.userName")}</TableHead>
            <TableHead>{t("global.balance")}</TableHead>
            <TableHead>{t("global.email")}</TableHead>
            <TableHead>{t("global.apiToken")}</TableHead>
            <TableHead>{t("global.scopes")}</TableHead>
            <TableHead>{t("global.status")}</TableHead>
            <TableHead>{t("global.creationDate")}</TableHead>
            <TableHead>{t("global.modificationDate")}</TableHead>
            <TableHead>{t("global.isDeleted")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {params.page * params.size + index + 1}
              </TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.balance}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.apiToken}</TableCell>
              <TableCell>{user.scopes}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.creationDate}</TableCell>
              <TableCell>{user.modificationDate}</TableCell>
              <TableCell>
                {user.isDeleted ? t("global.yes") : t("global.no")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationDemo
        total={total}
        current={params.page}
        onChange={onPageChange}
      />{" "}
    </>
  );
};

export default ManagerUserTable;
