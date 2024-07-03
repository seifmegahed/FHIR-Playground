export type PaginationProps = {
  pageIndex: number;
  numPages: number;
  onPageChange: (pageIndex: number) => void;
};

export interface PaginationInnerProps extends PaginationProps {
  maxPageButtons: number;
  pageButtons: number[];
}
