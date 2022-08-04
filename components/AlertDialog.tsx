import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    dialogTitle: string,
    dialogText: string,
    openDialog: boolean,
    handleNoCloseDialog: () => void,
    handleYesCloseDialog: () => void
}

export default function AlertDialogSlide({
    dialogText, dialogTitle, openDialog, handleNoCloseDialog, handleYesCloseDialog}: Props) {

  return (
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleNoCloseDialog || handleYesCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoCloseDialog}>No</Button>
          <Button onClick={handleYesCloseDialog}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
