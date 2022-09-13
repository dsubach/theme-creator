import React from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PaletteInput } from '../paletteInput/PaletteInput';
import { useThemeValue } from 'src/state/selectors';
import { useStyles } from './PaletteSubType.styles';
import { IPaletteSubTypeProps } from './types';

export const PaletteSubType = ({ title, path, paletteValues }: IPaletteSubTypeProps) => {
  const classes = useStyles();
  const themeValues = useThemeValue(path);

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.title} variant="body2">
            {title}
          </Typography>
          <div className={classes.thumbnailContainer}>
            {paletteValues.map(([name, subPath]) => (
              <div
                key={name}
                className={classes.colorThumbnail}
                style={{ backgroundColor: themeValues?.[subPath] }}
              />
            ))}
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {paletteValues.map(([name, subPath]) => (
            <PaletteInput key={`${title}-${name}`} label={name} path={`${path}.${subPath}`} />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
