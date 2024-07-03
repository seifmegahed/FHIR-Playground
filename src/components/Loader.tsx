import LoadingIcon from "../icons/LoadingIcon";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full absolute top-0 left-0 bg-gray-100/50 z-50">
      <LoadingIcon />
    </div>
  );
}

/*
 */
