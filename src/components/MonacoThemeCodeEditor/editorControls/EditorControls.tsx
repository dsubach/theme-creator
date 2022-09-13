import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton, Divider } from '@material-ui/core';
import { useCanSave } from 'src/state/selectors';
import { CopyButton } from '../copyButton/CopyButton';
import { useAppSelector } from 'src/state/hooks';
import { IEditorControlsProps } from './types';
import { useStyles } from './EditorControls.styles';
import { EditorButton } from '../editorButton/EditorButton';

export const EditorControls = ({ onRedo, onUndo, onSave }: IEditorControlsProps) => {
  const classes = useStyles();
  const canUndo = useAppSelector((state) => state.editor.canUndo);
  const canRedo = useAppSelector((state) => state.editor.canRedo);
  const canSave = useCanSave();

  return (
    <div className={classes.editorControlRoot}>
      <div className={classes.editorControlActions}>
        <EditorButton />
        <CopyButton />
        <Divider orientation="vertical" flexItem />
        <Tooltip title="Undo (Ctrl + Z)">
          <span>
            <IconButton disabled={!canUndo} onClick={onUndo}>
              <UndoIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Redo (Ctrl + Y)">
          <span>
            <IconButton disabled={!canRedo} onClick={onRedo}>
              <RedoIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Save Changes (Ctrl + S)">
          <span>
            <IconButton disabled={!canSave} onClick={onSave}>
              <SaveIcon />
            </IconButton>
          </span>
        </Tooltip>
      </div>
      <Typography
        variant="body2"
        color={canSave ? 'textPrimary' : 'textSecondary'}
        display="inline"
      >
        {canSave ? '* Unsaved Changes' : 'All changes saved'}
      </Typography>
    </div>
  );
};
