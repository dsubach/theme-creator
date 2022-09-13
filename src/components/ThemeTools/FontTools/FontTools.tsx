import React from 'react';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAppSelector } from 'src/state/hooks';
import { Chip } from '@material-ui/core';
import { AddFontInput } from './addFontInput/AddFontInput';
import { PopularFontList } from './popularFontList/PopularFontList';
import { useStyles } from './FontTools.styles';

export const FontTools = () => {
  const classes = useStyles();
  const loadedFonts = useAppSelector((state) => state.loadedFonts);
  const currentFonts = useAppSelector((state) => state.savedThemes[state.themeId].fonts);

  return (
    <>
      <Accordion>
        <AccordionSummary>
          <AddFontInput />
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2">Popular Fonts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PopularFontList />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={currentFonts.length < 5}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {`Fonts used in current theme (${currentFonts.length})`}
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.loadedFontContent}>
            {currentFonts.map((font) => (
              <Chip label={font} key={font} size="small" style={{ fontFamily: font }} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {`Loaded and Available Fonts (${loadedFonts.size})`}
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.loadedFontContent}>
            {[...loadedFonts].map((font) => (
              <Chip label={font} key={font} size="small" style={{ fontFamily: font }} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
