import { ReactNode } from "react";

type FormWrapperAppoinmentProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapperAppoinment({
  title,
  children,
}: FormWrapperAppoinmentProps) {
  return (
    <div className="form-step">
      <h2>{title}</h2>
      <div className="children-form">{children}</div>
    </div>
  );
}
