import React, { SyntheticEvent } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Typography } from "@mui/material";

interface Props {
  openAlert: boolean;
  closeAlert: (
    event: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => void;
  outputIcon?: JSX.Element;
  outputText?: string;
  verticalPosition?: "bottom" | "top" | undefined;
  horizontalPosition?: "center" | "left" | "right" | undefined;
}

const CustomSnackbar = ({
  openAlert,
  closeAlert,
  outputIcon,
  outputText,
  verticalPosition,
  horizontalPosition,
}: Props) => {
  // Snackbar Alert
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={closeAlert}
        anchorOrigin={{
          vertical: verticalPosition as "bottom" | "top",
          horizontal: horizontalPosition as "center" | "left" | "right",
        }}
      >
        <Alert onClose={closeAlert} severity="success" sx={{ width: "100%" }}>
          {outputIcon}
          <Typography>{outputText}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
