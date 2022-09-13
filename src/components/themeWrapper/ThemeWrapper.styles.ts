import { Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  themeContainer: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
  },
}));
