export default function SaveButton(props: {
  disabled?: boolean;
}) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-300 text-white font-bold text-lg py-2 px-4 my-4 rounded-lg w-48 transition-all duration-300 ease-in-out"
      color="primary"
      type="submit"
      disabled={props.disabled}
    >
      Save
    </button>
  );
}