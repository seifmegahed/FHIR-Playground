import PaginationButton from "./PaginationButton";
import PaginationEnd from "./PaginationEnd";
import PaginationMid from "./PaginationMid";
import PaginationStart from "./PaginationStart";
import { PaginationProps } from "./PaginationTypes";

export default function Pagination(props: PaginationProps) {
  const { pageIndex, numPages, onPageChange } = props;
  const maxPageButtons = 8;
  const pageButtons = Array.from({ length: numPages }, (_, i) => i + 1);
  if (numPages < maxPageButtons)
    return pageButtons.map((page) => (
      <PaginationButton
        key={"page-" + page}
        value={page}
        isActive={pageIndex === page - 1}
        onClick={() => onPageChange(page - 1)}
      />
    ));
  if (pageIndex < maxPageButtons - 3)
    return (
      <PaginationStart
        maxPageButtons={maxPageButtons}
        pageButtons={pageButtons}
        {...props}
      />
    );
  if (pageIndex > numPages - maxPageButtons + 2)
    return (
      <PaginationEnd
        maxPageButtons={maxPageButtons}
        pageButtons={pageButtons}
        {...props}
      />
    );
  return (
    <PaginationMid
      maxPageButtons={maxPageButtons}
      pageButtons={pageButtons}
      {...props}
    />
  );
}
