import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textTransform: 'capitalize',
    },
    accordionDetails: {
      flexDirection: 'column',
      '&> *': {
        marginBottom: theme.spacing(2),
      },
    },
    thumbnailContainer: {
      display: 'flex',
      alignSelf: 'stretch',
    },
    colorThumbnail: {
      height: '100%',
      width: 15,
      marginLeft: 4,
      border: '1px solid grey',
    },
  }),
);
