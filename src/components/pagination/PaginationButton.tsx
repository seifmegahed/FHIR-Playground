export default function PaginationButton(props: {
  onClick: () => void;
  isActive: boolean;
  value: number;
  disabled?: boolean;
}) {
  const { onClick, isActive, value, disabled } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`hover:bg-gray-200 flex items-center justify-center font-bold h-10 w-10 rounded-full ${
        isActive && "text-blue-400"
      }`}
    >
      {value}
    </button>
  );
}