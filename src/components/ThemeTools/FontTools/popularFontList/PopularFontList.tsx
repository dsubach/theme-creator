import React, { useState, useCallback, useEffect } from 'react';
import { addFonts } from 'src/state/reducers';
import { Chip, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { defaultFonts } from './contants';

export const PopularFontList = () => {
  const dispatch = useAppDispatch();
  const loadedFonts = useAppSelector((state) => state.loadedFonts);
  const [fontShortList, setFontShortList] = useState(defaultFonts);

  useEffect(() => {
    const fonts = [...defaultFonts];
    // reduce defaultFonts to only fonts not already loaded

    setFontShortList(
      fonts.reduce(
        (fontList: string[], font: string) =>
          loadedFonts.has(font) ? fontList : [...fontList, font],
        [],
      ),
    );
  }, [loadedFonts]);

  const handleDefaultFontClick = useCallback(
    (fontName: string) => {
      dispatch(addFonts([fontName]));
      const index = fontShortList.indexOf(fontName);
      setFontShortList([...fontShortList.slice(0, index), ...fontShortList.slice(index + 1)]);
    },
    [dispatch, fontShortList],
  );

  return fontShortList.length > 0 ? (
    <Grid container spacing={1}>
      {fontShortList.map((font: string) => (
        <Grid item key={font}>
          <Chip label={font} icon={<AddIcon />} onClick={() => handleDefaultFontClick(font)} />
        </Grid>
      ))}
    </Grid>
  ) : null;
};
