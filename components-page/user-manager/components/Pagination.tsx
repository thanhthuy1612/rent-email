import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationDemoProps {
    total: number;
    current: number;
    onChange: (page: number) => void;
}

export function PaginationDemo({ total, current, onChange }: PaginationDemoProps) {
    const pages = Array.from({ length: total }, (_, i) => i + 1);

    const handlePageClick = (page: number) => (event: React.MouseEvent) => {
        event.preventDefault();
        onChange(page);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={handlePageClick(current - 1)} />
                </PaginationItem>
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={page === current}
                            onClick={handlePageClick(page)}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" onClick={handlePageClick(current + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}