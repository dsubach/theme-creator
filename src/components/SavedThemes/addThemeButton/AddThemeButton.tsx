import React, { useState, useRef, useCallback, FormEvent, FocusEvent } from 'react';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { useAppDispatch } from 'src/state/hooks';
import { addNewSavedTheme } from 'src/state/actions';

export const addThemeButtonId = 'add-theme-button';

const AddThemeButton = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => event.target.select();

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const inputValue = inputRef.current?.value ?? '';

      dispatch(addNewSavedTheme(inputValue));
      handleClose();
    },
    [dispatch],
  );

  return (
    <>
      <Button id={addThemeButtonId} variant="outlined" color="secondary" onClick={handleClickOpen}>
        Add New Theme
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="add-theme-dialog">
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogTitle id="add-theme-dialog">Add New Theme</DialogTitle>
          <DialogContent>
            <TextField
              inputRef={inputRef}
              autoFocus
              onFocus={handleFocus}
              defaultValue="New Theme"
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
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddThemeButton;
