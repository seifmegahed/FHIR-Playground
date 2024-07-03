import MagicIcon from "../icons/MagicIcon";

export default function MagicFillButton(props: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className=" hover:bg-gray-200 p-4 rounded-full transition-all duration-300 ease-in-out"
      onClick={props.onClick}
      color="primary"
      disabled={props.disabled}
    >
      <MagicIcon />
    </button>
  );
}
