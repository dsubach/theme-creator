import React from 'react';
import { ThemeProvider, Typography, Paper, Grid } from '@material-ui/core';
import { useAppSelector } from 'src/state/hooks';
import { useStyles } from './TypographySampleArea.styles';
import { ITypographySampleAreaProps } from './types';

export const TypographySampleArea = ({
  variant,
  bgText,
  paperText,
  smallPreview,
  ...typographyProps
}: ITypographySampleAreaProps) => {
  const classes = useStyles();
  const themeObject = useAppSelector((state) => state.themeObject);
  const typographyClassName = `${typographyProps.className} ${classes.text} ${
    smallPreview ? classes.smallText : ''
  }`;

  return (
    <ThemeProvider theme={themeObject}>
      <Paper
        variant="outlined"
        className={classes.sampleAreaRoot}
        style={{
          backgroundColor: themeObject.palette.background.default,
        }}
      >
        <Grid container wrap="nowrap" alignItems="baseline">
          <Grid item>
            <Typography {...typographyProps} variant={variant} className={typographyClassName}>
              {bgText}
            </Typography>
          </Grid>
          <Grid item>
            <Paper variant="outlined" square className={classes.sampleAreaPaper}>
              <Typography {...typographyProps} variant={variant} className={typographyClassName}>
                {paperText}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};
