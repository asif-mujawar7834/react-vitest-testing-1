import { FC } from "react";
import { Alert } from "react-bootstrap";

interface AlertBoxProps {
  message: string;
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
}

export const AlertBox: FC<AlertBoxProps> = ({ message, variant }) => {
  return (
    <div className="sm:w-3/4  mx-auto py-5">
      <Alert variant={variant}>{message}</Alert>
    </div>
  );
};
