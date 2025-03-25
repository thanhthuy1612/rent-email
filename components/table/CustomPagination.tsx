import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export interface Props {
  total: number;
  pageSize: number;
  setPageSize: (event: number) => void;
  pageNumber: number;
  setPageNumber: (event: number) => void;
}
const CustomPagination: React.FC<Props> = ({
  total,
  pageSize,
  setPageSize,
  pageNumber,
  setPageNumber,
}) => {
  const rows = [10, 20, 50];
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setPageNumber(page);
    }
  };

  console.log(totalPages, pageNumber);

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 justify-center md:justify-between">
      <div>Tổng: {total}</div>
      <div className="flex gap-5 items-center flex-col md:flex-row">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {rows.map((item) => (
              <SelectItem key={item} value={item.toString()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                title=" "
                onClick={() => {
                  pageNumber !== 1 && handlePageChange(pageNumber - 1);
                }}
                className={`${pageNumber === 1 && "opacity-50 cursor-not-allowed"}`}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= pageNumber - 1 && page <= pageNumber + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === pageNumber}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              if (page === pageNumber - 2 || page === pageNumber + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  pageNumber !== totalPages && handlePageChange(pageNumber + 1);
                }}
                className={`${(pageNumber === totalPages || totalPages === 0) && "opacity-50 cursor-not-allowed"}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default CustomPagination;
