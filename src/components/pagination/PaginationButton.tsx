export default function PaginationButton(props: {
  onClick: () => void;
  isActive: boolean;
  value: number;
}) {
  const { onClick, isActive, value } = props;
  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className={`flex items-center justify-center font-bold h-10 w-10 rounded-full ${
        isActive ? "text-blue-400" : "hover:bg-gray-200"
      }`}
    >
      {value}
    </button>
  );
}
