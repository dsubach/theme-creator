import React, { useCallback } from 'react';
import componentSamples from 'src/components/MuiComponentSamples/Samples';
import {
  Drawer,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Link,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { toggleComponentNav, setTab } from 'src/state/reducers';
import { useStyles } from './ComponentNavDrawer.styles';

export const componentNavDrawerId = 'component-nav-drawer';

const ComponentNavDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const permanent = useMediaQuery(theme.breakpoints.up('md'));
  const open = useAppSelector((state) => state.componentNavOpen);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(toggleComponentNav(''));
    dispatch(setTab('components'));
  }, [dispatch]);

  return (
    <Drawer
      id={componentNavDrawerId}
      className={classes.drawer}
      variant={permanent ? 'permanent' : 'temporary'}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      anchor="left"
      onClose={() => dispatch(toggleComponentNav(''))}
    >
      <List dense className={classes.list}>
        <ListSubheader>Components</ListSubheader>
        {componentSamples.map(({ id, title }) => (
          <ListItem key={id} button component={Link} href={`#${id}`} onClick={handleClick}>
            <ListItemText
              primary={title}
              className={classes.listItemText}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ComponentNavDrawer;
