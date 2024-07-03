import ChevronDownIcon from "../icons/ChevronDownIcon";
import { ReactNode } from "react";

export default function DropDownSection(props: {
  children: ReactNode;
  className?: string;
  title: string;
  open: boolean;
  toggleOpen: () => void;
}) {
  return (
    <>
      <div className={props.className}>
        <div
          className="flex justify-between items-center w-full cursor-pointer"
          onClick={props.toggleOpen}
        >
          <h1 className="text-2xl font-bold mb-3">{props.title}</h1>
          <div
            className={`${
              props.open ? "rotate-180" : ""
            } transition-all duration-300 ease-in-out`}
          >
            <ChevronDownIcon />
          </div>
        </div>
        <hr></hr>
      </div>
      <div className={"md:col-span-2 overflow-hidden"}>
        <div
          className={`px-1 transition-all duration-300 ease-in-out ${
            props.open ? "block" : "-translate-y-full absolute -z-10"
          }`}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
