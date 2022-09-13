import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
} from '@material-ui/core';
import { useUpdateEditorState } from 'src/state/actions';
import { useAppSelector } from 'src/state/hooks';
import { useStyles } from './EditorSettings.styles';

export const EditorSettings = () => {
  const updateEditorState = useUpdateEditorState();
  const classes = useStyles();
  const formatOnSave = useAppSelector((state) => state.editor.formatOnSave);
  const outputTypescript = useAppSelector((state) => state.editor.outputTypescript);
  const toggleFormatOnSave = () => updateEditorState({ formatOnSave: !formatOnSave });
  const toggleOutputTypescript = () => updateEditorState({ outputTypescript: !outputTypescript });

  return (
    <List dense className={classes.settingsList}>
      <ListSubheader>Editor Settings</ListSubheader>
      <ListItem button onClick={toggleFormatOnSave}>
        <ListItemText id="format-document-label" primary="Format Document on Save (Prettier)" />
        <ListItemSecondaryAction>
          <Checkbox
            checked={formatOnSave}
            onChange={toggleFormatOnSave}
            name="formatOnSave"
            inputProps={{ 'aria-labelledby': 'format-document-label' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={toggleOutputTypescript}>
        <ListItemText id="output-typescript-label" primary="Copy Button Outputs Typescript" />
        <ListItemSecondaryAction>
          <Checkbox
            checked={outputTypescript}
            onChange={toggleOutputTypescript}
            name="outputTypescript"
            inputProps={{ 'aria-labelledby': 'output-typescript-label' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
