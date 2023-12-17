import clsx from "clsx";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?(): void;
}

const Button: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button
      className={clsx(
        "h-[40px] flex justify-center items-center rounded-lg",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
