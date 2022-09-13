import React, { useCallback, MouseEvent } from 'react';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useAppDispatch } from 'src/state/hooks';
import { removeSavedTheme } from 'src/state/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import { DialogContentText, Typography } from '@material-ui/core';
import { IDeleteThemeButton } from './types';

export const DeleteThemeButton = ({ themeId, themeName, disabled }: IDeleteThemeButton) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      dispatch(removeSavedTheme(themeId));
      handleClose();
    },
    [dispatch],
  );

  return (
    <>
      <Button size="large" startIcon={<DeleteIcon />} disabled={disabled} onClick={handleClickOpen}>
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-theme-dialog"
        aria-describedby="alert-dialog-description"
        onClick={(event) => event.stopPropagation()}
      >
        <DialogTitle id="delete-theme-dialog">Delete Theme?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-theme-description">
            {'Delete the theme '}
            <Typography color="secondary" component="span">
              {themeName}
            </Typography>
            {'? This action cannot be undone'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
