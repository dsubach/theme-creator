import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Snackbar, IconButton, Collapse, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useStyles } from './EditorErrors.styles';
import { useAppSelector } from 'src/state/hooks';
import { IEditorErrorProps } from './types';

export const EditorErrors = ({ editorRef }: IEditorErrorProps) => {
  const classes = useStyles();
  const errors = useAppSelector((state) => state.editor.errors);
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(errors.length < 3); // default open if 1 or 2 errors
  const handleClose = () => setOpen(false);
  const handleExpand = () => setExpanded(!expanded);
  const model = editorRef.current?.getModel();

  useEffect(() => {
    if (errors.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    if (errors.length < 3) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [errors]);

  const getErrorString = (error: languages.typescript.Diagnostic) => {
    if (!error.start) {
      return error.messageText;
    }
    const pos = model?.getPositionAt(error.start);
    return `Line ${pos?.lineNumber}:${pos?.column}. ${
      error.messageText?.messageText ?? error.messageText
    }`;
  };

  const alertIcon = (
    <IconButton
      onClick={handleExpand}
      size="small"
      className={clsx(classes.expandIcon, {
        [classes.expanded]: expanded,
      })}
    >
      <ExpandLessIcon />
    </IconButton>
  );

  const alertAction = (
    <IconButton onClick={handleClose} size="small">
      <CloseIcon />
    </IconButton>
  );

  return (
    <div className={classes.root}>
      <Snackbar open={open} className={classes.errorItem}>
        <Alert
          severity="error"
          icon={alertIcon}
          action={alertAction}
          classes={{
            root: classes.alertRoot,
            icon: classes.alertIcon,
            message: classes.alertMessage,
          }}
        >
          <Collapse in={expanded}>
            {errors.map((e) => (
              <div key={`${e.code}-${e.start}`} className={classes.errorLine}>
                {getErrorString(e)}
              </div>
            ))}
            <Divider className={classes.alertDivider} />
          </Collapse>
          <div>{`${errors.length} errors preventing save.`}</div>
        </Alert>
      </Snackbar>
    </div>
  );
};
