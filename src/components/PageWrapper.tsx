import { ReactNode } from "react";

export default function PageWrapper(props: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col items-center justify-between text-gray-500 flex-grow h-full max-w-screen-lg">
      {props.children}
    </div>
  );
}
