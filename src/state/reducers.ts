import { NewSavedTheme, IPersistedState, EditorStateOptions } from './types';
import { IThemeEditor } from 'src/state/types';
import { ThemeOptions } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import {
  createPreviewMuiTheme,
  generateThemeId,
  getFontsFromThemeOptions,
  loadFontsIfRequired,
  onRemoveSavedTheme,
  stringify,
} from 'src/utils/utils';
import { loadFonts } from './actions';

import { defaultThemeOptions } from 'src/siteTheme';

import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { REHYDRATE } from 'redux-persist';

import { enableMapSet } from 'immer';

const defaultThemeId = generateThemeId({});

const initialFonts = ['Droid Sans', 'Droid Serif', 'Open Sans', 'Roboto'];

const initialState: IThemeEditor = {
  themeId: defaultThemeId,
  themeOptions: defaultThemeOptions, // the object loaded into createTheme
  themeObject: createTheme(defaultThemeOptions),
  savedThemes: {
    [defaultThemeId]: {
      id: defaultThemeId,
      name: 'My Theme',
      themeOptions: defaultThemeOptions,
      fonts: ['Roboto'],
      lastUpdated: new Date().toISOString(),
    },
  },
  loadedFonts: loadFontsIfRequired(initialFonts, new Set()),
  activeTab: 'components',
  previewSize: false,
  componentNavOpen: false,
  themeConfigOpen: false,
  mobileWarningSeen: false,
  editor: {
    themeInput: stringify(defaultThemeOptions),
    initialVersion: 0,
    currentVersion: 0,
    lastVersion: 0,
    savedVersion: 0,
    canRedo: false,
    canUndo: false,
    errors: [],
    formatOnSave: true,
    outputTypescript: true,
  },
};

enableMapSet();

export const addFonts = createAsyncThunk('appSlice/addFonts', async (fonts: string[]) => {
  await loadFonts(fonts);
  return fonts;
});

const restoreState = createAction<IPersistedState>(REHYDRATE);

const appSlice: Slice<IThemeEditor, SliceCaseReducers<IThemeEditor>, string> = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    resetSiteData() {
      return initialState;
    },
    showWarningScreen(state) {
      state.mobileWarningSeen = true;
    },
    toggleThemeConfig(state) {
      state.themeConfigOpen = !state.themeConfigOpen;
    },
    toggleComponentNav(state) {
      state.componentNavOpen = !state.componentNavOpen;
    },
    setTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    addNewTheme(state, action: PayloadAction<NewSavedTheme>) {
      const newThemeId = uuidv4();
      const newThemeObject = createPreviewMuiTheme(action.payload.themeOptions, state.previewSize);
      const newThemeOptions = action.payload.themeOptions;
      const newSavedThemes = {
        [newThemeId]: {
          ...action.payload,
          id: newThemeId,
          lastUpdated: new Date().toISOString(),
        },
      };

      return {
        ...state,
        editor: { ...state.editor, themeInput: stringify(action.payload.themeOptions) },
        themeId: newThemeId,
        themeOptions: {
          ...state.themeOptions,
          newThemeOptions,
        },
        themeObject: {
          ...state.themeObject,
          newThemeObject,
        },
        savedThemes: Object.assign(state.savedThemes, newSavedThemes),
        loadedFonts: loadFontsIfRequired(action.payload.fonts, state.loadedFonts),
      };
    },
    updateTheme(state, action: PayloadAction<ThemeOptions>) {
      const newThemeObject = createPreviewMuiTheme(action.payload, state.previewSize);
      const newThemeOptions = action.payload;
      const newSavedThemes = {
        [state.themeId]: {
          ...state.savedThemes[state.themeId],
          themeOptions: action.payload,
          fonts: getFontsFromThemeOptions(
            action.payload,
            state.savedThemes[state.themeId]?.fonts,
            state.loadedFonts,
          ),
          lastUpdated: new Date().toISOString(),
        },
      };

      return {
        ...state,
        themeOptions: {
          ...state.themeOptions,
          newThemeOptions,
        },
        themeObject: {
          ...state.themeObject,
          newThemeObject,
        },
        editor: { ...state.editor, themeInput: stringify(action.payload) },
        savedThemes: Object.assign(state.savedThemes, newSavedThemes),
      };
    },
    loadTheme(state, action: PayloadAction<string>) {
      const newThemeObject = createPreviewMuiTheme(
        state.savedThemes[action.payload].themeOptions as ThemeOptions,
        state.previewSize,
      );

      return {
        ...state,
        editor: {
          ...state.editor,
          themeInput: stringify(state.savedThemes[action.payload].themeOptions as ThemeOptions),
        },

        themeId: action.payload,
        themeOptions: state.savedThemes[action.payload].themeOptions,
        themeObject: {
          ...state.themeObject,
          newThemeObject,
        },
        loadedFonts: loadFontsIfRequired(
          state.savedThemes[action.payload].fonts,
          state.loadedFonts,
        ),
      };
    },

    removeTheme(state, action: PayloadAction<string>) {
      const newSavedThemes = onRemoveSavedTheme(state, action.payload);

      return {
        ...state,
        savedThemes: Object.assign(state.savedThemes, newSavedThemes.savedThemes),
      };
    },
    renameTheme(state, action: PayloadAction<{ themeId: string; name: string }>) {
      const { themeId, name } = action.payload;
      state.savedThemes[themeId] = {
        ...state.savedThemes[themeId],
        name,
        lastUpdated: new Date().toISOString(),
      };
    },
    updateEditorState(state, action: PayloadAction<EditorStateOptions>) {
      state.editor = { ...state.editor, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFonts.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.loadedFonts = new Set([...state.loadedFonts, ...action.payload].sort());
    }),
      builder.addCase(restoreState, (state, action: PayloadAction<IPersistedState | null>) => {
        if (action.payload) {
          const newThemeObject = createPreviewMuiTheme(
            action.payload.themeOptions,
            state.previewSize,
          );

          return {
            ...state,
            themeObject: {
              ...state.themeObject,
              newThemeObject,
            },
            loadedFonts: loadFontsIfRequired(
              action.payload.savedThemes[action.payload.themeId].fonts,
              state.loadedFonts,
            ),
          };
        }
        return state;
      });
    // builder.addCase('persist/REHYDRATE', (state, action: PayloadAction<IPersistedState>) => {
    //   if (action.payload != null) {
    //     return {
    //       ...state,
    //       themeObject: createPreviewMuiTheme(action.payload.themeOptions, state.previewSize),
    //       loadedFonts: loadFontsIfRequired(
    //         action.payload.savedThemes[action.payload.themeId].fonts,
    //         state.loadedFonts,
    //       ),
    //     };
    //   }
    //   return state;
    // });
  },
});

export const {
  addNewTheme,
  loadTheme,
  removeTheme,
  renameTheme,
  renameTheme1,
  resetSiteData,
  setTab,
  showWarningScreen,
  toggleComponentNav,
  toggleThemeConfig,
  updateTheme,
  updateEditorState,
} = appSlice.actions;

export default appSlice.reducer;
