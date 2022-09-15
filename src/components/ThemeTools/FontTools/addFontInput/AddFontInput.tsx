import React, { useState, FormEvent, useCallback } from 'react';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { useAppDispatch } from 'src/state/hooks';
import { InputAdornment, CircularProgress, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { addFonts } from 'src/state/reducers';

export const AddFontInput = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAddFontName = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.persist();
      const fontName: string = event.currentTarget.fontname.value;
      setLoading(true);

      dispatch(addFonts([fontName])).then((loaded) => {
        setLoading(false);

        if (loaded) {
          event.currentTarget.fontname.value = '';
        } else {
          setError(true);
        }
      });
    },
    [dispatch],
  );

  return (
    <form onSubmit={handleAddFontName} autoComplete="off">
      <Typography variant="body2">Add Fonts</Typography>
      <TextField
        name="fontname"
        // label="Add Fonts"
        error={error}
        helperText={
          error ? (
            'Error loading font'
          ) : (
            <>
              {'Enter the name of a '}
              <Link href="https://fonts.google.com/" target="_blank" rel="noreferrer">
                {'Google Font'}
              </Link>
            </>
          )
        }
        onClick={(event) => event.stopPropagation()}
        onChange={() => setError(false)}
        // InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddIcon />
            </InputAdornment>
          ),
          endAdornment: loading && (
            <InputAdornment position="end">
              <CircularProgress size="1.5rem" />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};
