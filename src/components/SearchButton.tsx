import SearchIcon from "../icons/SearchIcon";

export default function MagicFillButton(props: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className=" hover:bg-gray-200 rounded-full h-12 w-12 flex justify-center items-center transition-all duration-300 ease-in-out"
      onClick={props.onClick}
      color="primary"
      type="button"
      disabled={props.disabled}
    >
      <SearchIcon />
    </button>
  );
}
