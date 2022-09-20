import React, { useCallback } from 'react';
import { getByPath } from 'src/utils/utils';
import { Link, Tooltip, Accordion, AccordionSummary, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { setThemeOptions, removeThemeOptions } from 'src/state/actions';
import { ThemeValueChangeEvent } from '../../events';
import { SnippetModification } from '../types';
import { ISnippetItemProps } from './types';
import { useStyles } from './SnippetItem.styles';

/**
 * Simple check of if the SnippetModification.configs are
 * set on the current theme options
 * @param configs
 */
const useIsSnippetIncluded = (configs: SnippetModification['configs']) => {
  const themeOptions = useAppSelector((state) => state.themeOptions);
  for (const c in configs) {
    if (getByPath(themeOptions, configs[c].path) == null) {
      return false;
    }
  }
  return true;
};

export const SnippetItem = ({ snippet }: ISnippetItemProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const handleAddSnippet = useCallback(() => {
    dispatch(setThemeOptions(snippet.configs));
    document.dispatchEvent(ThemeValueChangeEvent());
  }, [dispatch]);

  const handleRemoveSnippet = useCallback(() => {
    dispatch(removeThemeOptions(snippet.configs));
    document.dispatchEvent(ThemeValueChangeEvent());
  }, [dispatch]);

  const isSnippetIncluded = useIsSnippetIncluded(snippet.configs);

  const { info, docs, title } = snippet;
  const toolTipContent = info && (
    <div>
      <div>{info}</div>
      {Boolean(docs) && (
        <Link href={docs} target="_blank" rel="noreferrer">{`Theme ${title} Docs`}</Link>
      )}
    </div>
  );

  return (
    <Accordion
      disabled={isSnippetIncluded}
      onClick={isSnippetIncluded ? handleRemoveSnippet : handleAddSnippet}
    >
      <AccordionSummary>
        {isSnippetIncluded ? <RemoveIcon /> : <AddIcon />}
        <Typography variant="body2" className={classes.snippetTitle}>
          {title}
        </Typography>
        {info && toolTipContent && (
          <Tooltip title={toolTipContent} interactive arrow>
            <InfoOutlinedIcon />
          </Tooltip>
        )}
      </AccordionSummary>
    </Accordion>
  );
};
