import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TypographySampleArea from '../typographySampleArea/TypographySampleArea';
import { TypographyInput } from '../typographyInput/TypographyInput';
import { useStyles } from './TypographyGlobals.styles';

const defaultGlobalProperties = [
  'fontFamily',
  'fontSize',
  'fontWeightLight',
  'fontWeightRegular',
  'fontWeightMedium',
  'fontWeightBold',
  'htmlFontSize',
];

function TypographyGlobals() {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.accordionSummary}
        classes={{ content: classes.accordionSummaryContent }}
      >
        <TypographySampleArea variant="body1" bgText="Base Typography" paperText="Styles" />
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {defaultGlobalProperties.map((property) => (
          <div key={`base-text-${property}`}>
            <TypographyInput variantPath="typography" property={property} />
            <Divider />
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default TypographyGlobals;
