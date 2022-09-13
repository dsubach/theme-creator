import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  TypographyTypeMap,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TypographySampleArea from '../typographySampleArea/TypographySampleArea';
import { TypographyInput } from '../typographyInput/TypographyInput';
import { useStyles } from './TypographyVariant.styles';
import { ITypographyVariantProps } from './types';

const defaultVariantProperties = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
];

function TypographyVariant({ variant, text, smallPreview = false }: ITypographyVariantProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const variantPath = `typography.${variant}`;

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.accordionSummary}
        classes={{ content: classes.accordionSummaryContent }}
      >
        <TypographySampleArea
          variant={variant as TypographyTypeMap['props']['variant']}
          bgText={`${variant}.`}
          paperText={text}
          smallPreview={smallPreview && !expanded}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {defaultVariantProperties.map((property) => (
          <div key={`${variant}-${property}`}>
            <TypographyInput variantPath={variantPath} property={property} />
            <Divider />
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default TypographyVariant;
