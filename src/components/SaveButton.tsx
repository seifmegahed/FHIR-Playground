export default function SaveButton(props: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-300 text-white font-bold text-lg py-2 px-4 my-4 rounded-lg w-48 transition-all duration-300 ease-in-out"
      onClick={props.onClick}
      color="primary"
      disabled={props.disabled}
    >
      Save
    </button>
  );
}