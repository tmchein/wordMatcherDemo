import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props extends React.ComponentProps<"button"> {
  id: string;
}

const Button = ({
  children,
  id,
  onClick,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <button
      className={clsx(
        `w-32 capitalize py-3 rounded-lg border-2 border-b-4 border-gray-600 text-slate-300
          transition-colors duration-300`,
        className
      )}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
