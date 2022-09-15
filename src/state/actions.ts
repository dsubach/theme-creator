import { ThemeOptions } from '@material-ui/core';
import { setByPath, removeByPath, getByPath, verbose, getErrorMessage } from 'src/utils/utils';
import { defaultTheme, defaultThemeOptions } from 'src/siteTheme';
import { AppThunkAction, NewSavedTheme, IThemeEditor, EditorStateOptions } from './types';
import { canSave } from './selectors';
import { updateTheme, addNewTheme, loadTheme, removeTheme, updateEditorState } from './reducers';
import WebFont from 'webfontloader';
import { useCallback } from 'react';
import { parseEditorOutput } from '../utils/parser';
import { useAppDispatch } from './hooks';

/**
 * Remove a key/value in the theme options object by a given path.
 * Paths ending in "main" eg. "palette.primary.main" must be declared.
 * if the key path ends in "main"
 *  replace it with the default Theme value at that path
 * if the key is removed, and the containing object no longer
 * has any meaningful key/values, remove it as well
 * e.g. removing palette.background.default creates {palette: {background: {}}}
 * and should be removed to tidy the theme code
 * @param path - the path to remove from the themeOptions
 */
export const removeThemeOption =
  (path: string): AppThunkAction =>
  (dispatch, getState) => {
    if (checkIfUserAllowsOverwrite(getState())) {
      let updatedThemeOptions: ThemeOptions;

      // paths ending in "main" must be declared
      // replace with the value from the default Theme object
      if (path.endsWith('main')) {
        const defaultValueForPath = getByPath(defaultTheme, path);
        updatedThemeOptions = setByPath(getState().themeOptions, path, defaultValueForPath);
      } else {
        // remove the key from the themeOptions (immutably)
        updatedThemeOptions = removeByPath(getState().themeOptions, path);
      }

      return dispatch(updateTheme(updatedThemeOptions));
    }
  };

export const removeThemeOptions =
  (configs: Array<{ path: string; value: any }>): AppThunkAction =>
  (dispatch, getState) => {
    if (checkIfUserAllowsOverwrite(getState())) {
      let updatedThemeOptions = getState().themeOptions;
      configs.forEach(
        ({ path }) => (updatedThemeOptions = removeByPath(updatedThemeOptions, path)),
      );
      return dispatch(updateTheme(updatedThemeOptions));
    }
  };

export const setThemeOption =
  (path: string, value: any): AppThunkAction =>
  (dispatch, getState) => {
    if (checkIfUserAllowsOverwrite(getState())) {
      const updatedThemeOptions = setByPath(getState().themeOptions, path, value);
      return dispatch(updateTheme(updatedThemeOptions));
    }
  };

export const setThemeOptions =
  (configs: Array<{ path: string; value: any }>): AppThunkAction =>
  (dispatch, getState) => {
    if (checkIfUserAllowsOverwrite(getState())) {
      let updatedThemeOptions = getState().themeOptions;
      configs.forEach(
        ({ path, value }) => (updatedThemeOptions = setByPath(updatedThemeOptions, path, value)),
      );

      return dispatch(updateTheme(updatedThemeOptions));
    }
  };

/**
 * Check if the code editor has unsaved work, and if so, prompt the user
 * as to whether they'd like to overwrite with changes being made
 */
const checkIfUserAllowsOverwrite = (state: IThemeEditor) =>
  !canSave(state) ||
  confirm('There are unsaved changes in the code editor. Wipe changes and proceed?');

export const addNewSavedTheme = (name: string) =>
  addNewTheme({
    name,
    themeOptions: defaultThemeOptions,
    fonts: ['Roboto'],
    lastUpdated: new Date().toISOString(),
  });

export const addNewDefaultTheme = (newSavedTheme: Omit<NewSavedTheme, 'lastUpdated'>) =>
  addNewTheme({ ...newSavedTheme, lastUpdated: new Date().toISOString() });
/**
 * Switch to a new theme by ID
 */
export const loadSavedTheme = (themeId: string) => loadTheme(themeId);

export const removeSavedTheme =
  (themeId: string): AppThunkAction =>
  (dispatch, getState) => {
    // don't remove the theme unless it is not the current theme
    if (getState().themeId === themeId) {
      return false;
    }
    return dispatch(removeTheme(themeId));
  };

// export const renameSavedTheme = (themeId: string, name: string) => ({
//   type: "RENAME_THEME",
//   themeId,
//   name,
// })

/**
 * loads a set of passed fonts and resolves a promise
 * when the fonts load, or fail to load
 * @param fonts
 */
export const loadFonts = async (fonts: string[]) => {
  return await new Promise<boolean>((resolve) => {
    // require inline to support server side rendering
    try {
      WebFont.load({
        google: {
          families: fonts,
        },
        active: () => {
          verbose('state/actions -> loadFonts: webfonts loaded', fonts);
          resolve(true);
        },
        inactive: () => {
          verbose('state/actions -> loadFonts: webfonts could not load', fonts);
          resolve(false);
        },
      });
    } catch (err) {
      resolve(false);
    }
  });
};

/**
 * Save the code coming from the monaco-editor
 * strip the code of extra items, then parse
 * it into an object
 * @param code string - raw code output
 */
export const saveEditorToTheme = (code: string) => {
  let themeOptions;
  try {
    themeOptions = parseEditorOutput(code);
  } catch (err) {
    // dispatch errors to redux store
    return updateEditorState({
      errors: [
        {
          category: 1,
          messageText: `Error while JSON5 parsing code: ${getErrorMessage(err)}`,
        },
      ],
    });
  }
  return updateTheme(themeOptions);
};

/**
 * merge object representing editor properties on to editor state
 */
// export const updateEditorState = (editorState: EditorStateOptions) => { return updateEditor(editorState) }

/**
 * Pre-made callback to dispatch updateEditorState
 */
export const useUpdateEditorState = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (editorState: EditorStateOptions) => dispatch(updateEditorState(editorState)),
    [dispatch],
  );
};

/**
 * Determine status of canUndo and canRedo when the code editor's
 * version ID has changed
 * @param nextVersionId
 */
export const updateVersionStates =
  (nextVersionId: number): AppThunkAction =>
  (dispatch, getState) => {
    const { initialVersion, lastVersion, currentVersion } = getState().editor;

    let nextState: EditorStateOptions = {};
    if (nextVersionId < currentVersion) {
      // "undo" has been applied, enable redo
      nextState = {
        canRedo: true,
        canUndo: nextVersionId !== initialVersion,
      };
    } else {
      nextState = {
        canUndo: true,
        canRedo: nextVersionId < lastVersion,
        lastVersion: Math.max(currentVersion, lastVersion),
      };
    }
    nextState.currentVersion = nextVersionId;
    dispatch(updateEditorState(nextState));
  };
