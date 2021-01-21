import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Button from './Button';

const DialogBox = ({ setConfirmDialog, confirmDialog, title, action, children }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => setConfirmDialog({ ...confirmDialog, isOpen: false });

  return (
    <Dialog fullScreen={fullScreen} open={confirmDialog.isOpen} onClose={() => onClose()} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus text="CANCEL" color="primary" onClick={() => onClose()} />
        <Button autoFocus text={action.toUpperCase()} color="primary" onClick={confirmDialog.onConfirm} />
      </DialogActions>
    </Dialog>
  );
};
export default DialogBox;
