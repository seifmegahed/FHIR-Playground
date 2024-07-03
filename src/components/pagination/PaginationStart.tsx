import PaginationButton from "./PaginationButton";
import PaginationSeparator from "./PaginationSeparator";
import { PaginationInnerProps } from "./PaginationTypes";

export default function PaginationStart(props: PaginationInnerProps) {
  const { maxPageButtons, pageButtons, pageIndex, numPages, onPageChange } =
    props;

  return (
    <>
      {pageButtons.slice(0, maxPageButtons - 2).map((page) => (
        <PaginationButton
          key={"page-" + page}
          value={page}
          isActive={pageIndex === page - 1}
          onClick={() => onPageChange(page - 1)}
        />
      ))}
      <PaginationSeparator />
      <PaginationButton
        value={numPages}
        isActive={pageIndex === numPages - 1}
        onClick={() => onPageChange(numPages - 1)}
      />
    </>
  );
}
