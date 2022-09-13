import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  sampleItem: {
    marginBottom: theme.spacing(10),
    width: '100%',
    maxWidth: 1000,
    paddingLeft: theme.spacing(4),
    margin: 'auto',
  },
  inset: {},
  docsButton: {
    marginLeft: theme.spacing(2),
  },
  sampleContainer: {
    maxWidth: 1000,
    padding: theme.spacing(),
    margin: 'auto',
  },
}));
