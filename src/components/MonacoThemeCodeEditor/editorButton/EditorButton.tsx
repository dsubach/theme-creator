import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';

import { EditorSettings } from '../editorSettings/EditorSettings';

export const EditorButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Editor Settings">
        <IconButton onClick={handleOpen}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <EditorSettings />
      </Popover>
    </>
  );
};
