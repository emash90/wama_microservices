import { ReactNode } from "react";
import { Card } from "@mui/material";


type Props = {
  className?: string;
    children: ReactNode;
};

const BlankCard = ({ children, className }: Props) => {
  return (
    <Card
      sx={{ p: 0, position: "relative" }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
