import JSON5 from 'json5';
import deepmerge from 'deepmerge';
import { Draft } from '@reduxjs/toolkit';
import { ThemeOptions, Theme } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { BreakpointValues } from '@material-ui/core/styles/createBreakpoints';
import dotProp from 'dot-prop-immutable';
import { IThemeEditor, PreviewSize } from '../state/types';
import { loadFonts } from '../state/actions';

/**
 * Get an nested value from an object by a string path
 * e.g. resolvePath({a: {b: {c : 5}}}, 'a.b.c') would return 5
 *
 * @param {object} object - an object with nested key value pairs to access
 * @param {string} path   - a key path to access nested values
 * @param {*} defaultValue - optional default value if path not found
 */
export const getByPath = (object: object | null, path: string, defaultValue?: any) =>
  path.split('.').reduce((o: any, p) => (o ? o[p] : defaultValue), object) || defaultValue;

export const removeByPath = (object: any, path: any): Partial<any> => {
  const prunedObject = dotProp.delete(object, path);
  const pathArray = path.split('.');
  if (pathArray.length > 1) {
    const parentPath = pathArray.slice(0, pathArray.length - 1).join('.');
    const parentObject = getByPath(prunedObject, parentPath);
    if (
      parentObject &&
      typeof parentObject === 'object' &&
      Object.keys(parentObject).length === 0
    ) {
      return removeByPath(prunedObject, parentPath);
    }
  }

  return prunedObject;
};

export const setByPath = (object: any, path: string, value: any) =>
  dotProp.set(object, path, value);

/**
 * Generate an id for a saved theme, ensuring that it does not collide with
 * one already in the store
 */
export const generateThemeId = (savedThemes: IThemeEditor['savedThemes']) => {
  // generate a long string of characters
  const genString = () =>
    ['', '', ''].reduce((str) => (str += Math.random().toString(36).substring(2, 15)), '');

  let id;
  do {
    id = genString();
  } while (Object.prototype.hasOwnProperty.call(savedThemes, id));

  return id;
};

/**
 * Shallow comparison of sets for equality
 * @param a Set to compare
 * @param b Set to compare
 */
export function isSetEq(a: Set<any>, b: Set<any>) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;

  return true;
}

/**
 * Logs to console if in development mode
 * @param args parameters passed to `console.log`
 */
export function verbose(...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
}

export const stringify = (themeOptions: ThemeOptions) => {
  return `import { ThemeOptions } from '@material-ui/core';
  
  export const themeOptions: ThemeOptions = ${JSON5.stringify(themeOptions, null, 2)};`;
};

/**
 * Parse a `ThemeOptions` object to get a list of google fonts included
 * Note that the Material-UI default Theme uses Roboto as the base Font
 * @param themeOptions - the `ThemeOptions` object to parse
 * @param previousFonts - previous state of `savedThemes[id].fonts`
 * @param loadedFonts - `RootState.loadedFonts`
 *
 * @returns string[] - the google fonts included in `themeOptions`
 */
export const getFontsFromThemeOptions = (
  themeOptions: ThemeOptions,
  previousFonts: string[] | undefined,
  loadedFonts: Set<string>,
) => {
  const typography = themeOptions.typography as TypographyOptions | undefined;

  // get all defined fonts from the themeOptions
  const fontList: string[] = [
    typography?.fontFamily || 'Roboto',
    typography?.h1?.fontFamily,
    typography?.h2?.fontFamily,
    typography?.h3?.fontFamily,
    typography?.h4?.fontFamily,
    typography?.h5?.fontFamily,
    typography?.h6?.fontFamily,
    typography?.subtitle1?.fontFamily,
    typography?.subtitle2?.fontFamily,
    typography?.body1?.fontFamily,
    typography?.body2?.fontFamily,
    typography?.button?.fontFamily,
    typography?.caption?.fontFamily,
    typography?.overline?.fontFamily,
  ]
    .flatMap((x) => (x == null ? [] : x?.replace(/"/g, '').split(',')))
    // .filter((x): x is string => !!x) // remove nulls and undefined items
    // .map(x => ) // strip out quotes and split by comma
    // .flat() // flatten the array if any font families had multiple specified
    .map((x) => x.trim()); // trim off any white space

  const fontSet = new Set<string>();
  fontList.forEach((x) => loadedFonts.has(x) && fontSet.add(x));

  // if new fontSet hasn't changed from the current theme fonts
  // return the original Set for redux performance
  if (previousFonts != null && isSetEq(new Set(previousFonts), fontSet)) {
    return previousFonts;
  }

  return [...fontSet];
};

export const onRemoveSavedTheme = (state: IThemeEditor | Draft<IThemeEditor>, themeId: string) => {
  const newSavedThemes = { ...state.savedThemes };
  delete newSavedThemes[themeId];
  return { savedThemes: newSavedThemes };
};

export const loadFontsIfRequired = (fonts: string[], loadedFonts: Set<string>) => {
  const fontsToLoad = fonts.filter((x) => !loadedFonts.has(x));

  if (fontsToLoad.length === 0) return loadedFonts;

  loadFonts(fontsToLoad);

  return new Set([...loadedFonts, ...fontsToLoad].sort());
};

export const createPreviewMuiTheme = (
  themeOptions: ThemeOptions,
  previewSize: PreviewSize,
): Theme => {
  const spoofedBreakpoints: Record<string, BreakpointValues> = {
    xs: { xs: 0, sm: 10000, md: 10001, lg: 10002, xl: 10003 },
    sm: { xs: 0, sm: 1, md: 10001, lg: 10002, xl: 10003 },
    md: { xs: 0, sm: 1, md: 2, lg: 10002, xl: 10003 },
    lg: { xs: 0, sm: 1, md: 2, lg: 3, xl: 10003 },
    xl: { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 },
  };

  if (!previewSize) return createTheme(themeOptions);

  return createTheme(
    deepmerge({ breakpoints: { values: spoofedBreakpoints[previewSize] } }, themeOptions),
  );
};
