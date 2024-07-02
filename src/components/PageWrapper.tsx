import { ReactNode } from "react";

export default function PageWrapper(props: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col items-center justify-center flex-grow h-full max-w-screen-lg">
      {props.children}
    </div>
  );
}
