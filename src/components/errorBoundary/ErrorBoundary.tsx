import React, { ErrorInfo, ReactNode, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, Button } from '@material-ui/core';
import { resetSiteData } from 'src/state/reducers';
import { useAppDispatch } from 'src/state/hooks';

interface Props {
  children: ReactNode;
  classes: {
    errorRoot: string;
  };
}

interface State {
  hasError: boolean;
  error: null | string;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('Caught Error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={this.props.classes.errorRoot}>
          <Typography variant="h2">Something went wrong, causing the app to crash</Typography>
          <Typography variant="h5" gutterBottom>
            This likely is caused by an error on the ThemeOptions object
          </Typography>
          <Typography variant="h5" gutterBottom>
            This can be cleared up by wiping the saved theme data...
          </Typography>
          <Typography variant="h5" gutterBottom>
            but you will lose your saved themes.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Click the button below to reset your local storage data for this site
          </Typography>
          <ClearStorageButton />
        </div>
      );
    }

    return this.props.children;
  }
}

export default withStyles({
  errorRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    overflowY: 'auto',
  },
})(ErrorBoundary);

const ClearStorageButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(resetSiteData());
    location.reload();
  }, [dispatch]);

  return (
    <Button variant="contained" color="primary" size="large" onClick={handleClick}>
      Reset Site Data
    </Button>
  );
};
