import { IconButton, Tooltip } from "@mui/material";
import React from "react";

interface Props {
  icon: JSX.Element;
  toolTip: string;
  handleClick: () => void;
  id?: string;
}
const CustomIconBtn = ({ icon, toolTip, handleClick, id }: Props) => {
  return (
    <span id={id}>
      <Tooltip title={toolTip} onClick={handleClick}>
        <IconButton>{icon}</IconButton>
      </Tooltip>
    </span>
  );
};

export default CustomIconBtn;
