export default function SaveButton(props: { disabled?: boolean, onClick?: () => void }) {
  return (
    <button
      onClick={props.onClick}
      className={`${
        props.disabled ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-300"
      } text-white font-bold text-lg py-2 px-4 my-4 rounded-lg w-48 transition-all duration-300 ease-in-out`}
      color="primary"
      type="submit"
      disabled={props.disabled}
    >
      Save
    </button>
  );
}
