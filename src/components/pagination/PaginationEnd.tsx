import PaginationButton from "./PaginationButton";
import PaginationSeparator from "./PaginationSeparator";
import { PaginationInnerProps } from "./PaginationTypes";

export default function PaginationEnd(props: PaginationInnerProps) {
  const { maxPageButtons, pageButtons, pageIndex, numPages, onPageChange } =
    props;
  return (
    <>
      <PaginationButton
        value={1}
        isActive={pageIndex === 0}
        onClick={() => onPageChange(0)}
      />
      <PaginationSeparator />
      {pageButtons
        .slice(numPages - maxPageButtons + 2, numPages)
        .map((page) => (
          <PaginationButton
            key={"page-" + page}
            value={page}
            isActive={pageIndex === page - 1}
            onClick={() => onPageChange(page - 1)}
          />
        ))}
    </>
  );
}
