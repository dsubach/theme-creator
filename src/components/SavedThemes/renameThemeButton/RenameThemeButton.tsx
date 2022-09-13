import React, { useCallback, useState, FormEvent, MouseEvent } from 'react';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';
import { useAppDispatch } from 'src/state/hooks';
import { renameTheme } from 'src/state/reducers';
import { IRenameThemeButtonProps } from './types';

const RenameThemeButton = ({ themeId, defaultName }: IRenameThemeButtonProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => event.target.select();

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(renameTheme({ themeId, name: event.target.themeName.value }));
    },
    [dispatch],
  );

  return (
    <>
      <Button size="large" startIcon={<EditIcon />} onClick={handleClickOpen}>
        Rename
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="rename-theme-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogTitle id="rename-theme-dialog">Rename Theme</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              onFocus={handleFocus}
              defaultValue={defaultName}
              margin="dense"
              name="themeName"
              label="Theme Name"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" onClick={handleClose}>
              Rename
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default RenameThemeButton;
