import React, { useEffect } from 'react';
import { Hidden, Dialog, Typography, DialogContent, Slide, Button } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import hereBeDragonsImage from 'src/images/herebedragons.webp';
import { loadFonts } from 'src/state/actions';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { showWarningScreen } from 'src/state/reducers';
import { useStyles } from './SmallScreenWarning.styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SmallScreenWarning = () => {
  const classes = useStyles();
  const warningSeen = useAppSelector((state) => state.mobileWarningSeen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(showWarningScreen());
  };

  useEffect(() => {
    loadFonts(['Press Start 2P']);
  }, []);

  return (
    <Hidden smUp>
      <Dialog
        fullScreen
        open={!warningSeen}
        onClose={handleClose}
        TransitionComponent={Transition}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h5">Material-UI Theme Creator</Typography>
          <Typography variant="h6">You are using a small screen</Typography>
          <div>
            <Typography align="center" paragraph>
              This is a developer tool, designed for use on large screens
            </Typography>
            <Typography align="center">
              You will likely have issues viewing content or using the tools.
            </Typography>
          </div>
          <img src={hereBeDragonsImage} alt="Here Be Dragons... (for small screens)" width="75%" />
          <div className={classes.exitButtonArea}>
            <Typography align="center">Warning to all who enter</Typography>
            <Button variant="outlined" onClick={handleClose}>
              Here be dragons
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Hidden>
  );
};
