import React, { useState } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAppSelector } from 'src/state/hooks';

export const CopyButton = () => {
  const themeInput = useAppSelector((state) => state.editor.themeInput);
  const outputTypescript = useAppSelector((state) => state.editor.outputTypescript);
  const [open, setOpen] = useState(false);
  const copyToClipboard = () => {
    let codeToCopy = themeInput;
    if (!outputTypescript) {
      // naively strip out typescript (first three lines)
      // eslint-disable-next-line quotes
      codeToCopy = [`export const themeOptions = {`, ...themeInput.split('\n').slice(3)].join('\n');
    }
    navigator.clipboard.writeText(codeToCopy).then(() => setOpen(true));
  };

  return (
    <>
      <Tooltip title="Copy theme code">
        <IconButton color="primary" onClick={copyToClipboard}>
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setOpen(false)}
      >
        <Alert variant="filled" severity="success">
          Copied theme code to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};
