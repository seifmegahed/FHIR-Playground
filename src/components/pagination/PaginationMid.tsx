import PaginationButton from "./PaginationButton";
import PaginationSeparator from "./PaginationSeparator";
import { PaginationInnerProps } from "./PaginationTypes";

export default function PaginationMid(props: PaginationInnerProps) {
  const { pageButtons, pageIndex, numPages, onPageChange } = props;
  return (
    <>
      <PaginationButton
        value={1}
        isActive={pageIndex === 0}
        onClick={() => onPageChange(0)}
      />
      <PaginationSeparator />
      {pageButtons.slice(pageIndex - 2, pageIndex + 3).map((page) => (
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
