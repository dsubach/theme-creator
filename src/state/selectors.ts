import { createSelector } from 'reselect';
import { getByPath } from 'src/utils/utils';
import { IThemeEditor } from './types';
import { useMemo } from 'react';
import { ThemeOptions, Theme } from '@material-ui/core';
import { useAppSelector } from './hooks';
/**
 * Return the value of in the theme at the specified path,
 * and whether that value is set by the user or is default
 * @param path
 * @param themeOptions
 * @param themeObject
 */
const getThemeValueInfo = (path: string, themeOptions: ThemeOptions, themeObject: Theme) => {
  const valFromSaved: any = getByPath(themeOptions, path);
  return {
    modifiedByUser: valFromSaved !== undefined,
    value: getByPath(themeObject, path),
  };
};

const makeThemeValueInfoSelector = () =>
  createSelector(
    (_: any, path: string) => path,
    (state: IThemeEditor) => state.themeOptions,
    (state: IThemeEditor) => state.themeObject,
    getThemeValueInfo,
  );

/**
 * Return the value of in the theme at the specified path,
 * and whether that value is set by the user or is default
 * @param path
 */
export const useThemeValueInfo = (path: string) => {
  const selectThemeValue = useMemo(makeThemeValueInfoSelector, []);

  return useAppSelector((state) => selectThemeValue(state, path));
};

/**
 * Return the value of a generated theme at the specified path
 * @param path
 */
export const useThemeValue = (path: string) => useThemeValueInfo(path).value;

export const canSave = (state: IThemeEditor) =>
  state.editor.savedVersion !== state.editor.currentVersion;

/**
 * Return whether the code editor has unsaved changes
 */
export const useCanSave = () => useAppSelector((state) => canSave(state));
