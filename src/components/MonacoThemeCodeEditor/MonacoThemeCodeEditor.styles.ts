import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    monacoThemeEditorRoot: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    container: {
      height: 'calc(100% - 48px)',
      width: '100%',
    },
  }),
);
