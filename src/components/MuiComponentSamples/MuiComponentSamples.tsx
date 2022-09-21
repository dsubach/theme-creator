import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';

import componentSamples from './Samples';
import { useStyles } from './MuiComponentSamples.styles';

export const MuiComponentSamples = () => {
  const classes = useStyles();
  return (
    <div className={classes.sampleContainer}>
      <Typography variant="h4" gutterBottom>
        Material-UI Components
      </Typography>
      {componentSamples.map(({ id, title, component, docs }) => (
        <div key={id} id={id}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              href={docs}
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </Button>
          </Grid>
          <div className={classes.sampleItem}>{component}</div>
        </div>
      ))}
    </div>
  );
};
