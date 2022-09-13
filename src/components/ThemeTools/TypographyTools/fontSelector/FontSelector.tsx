import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useAppSelector } from 'src/state/hooks';
import { IFontSelector } from './types';

export const FontSelector = ({ onSelectFont }: IFontSelector) => {
  const loadedFonts = useAppSelector((state) => state.loadedFonts);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const handleClick = (fontName: string) => {
    setAnchorEl(null);
    onSelectFont(fontName);
  };

  return (
    <Tooltip title="Replace with Downloaded Font" placement="top" open={tooltipOpen}>
      <div
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        onClick={() => setTooltipOpen(false)}
      >
        <IconButton
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
          aria-haspopup="true"
        >
          <AddIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {[...loadedFonts].map((f) => (
            <MenuItem key={f} onClick={() => handleClick(f)} style={{ fontFamily: f }}>
              {f}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Tooltip>
  );
};
