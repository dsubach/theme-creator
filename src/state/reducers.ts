import { IPersistedState, EditorStateOptions } from './types';
import { IThemeEditor } from 'src/state/types';
import { createTheme } from '@material-ui/core/styles';
import {
  createPreviewMuiTheme,
  generateThemeId,
  loadFontsIfRequired,
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
    addNewTheme(state, action: PayloadAction<IThemeEditor>) {
      return action.payload;
    },
    updateTheme(_, action: PayloadAction<IThemeEditor>) {
      return action.payload;
    },
    loadTheme(_, action: PayloadAction<IThemeEditor>) {
      return action.payload;
    },

    removeTheme(state, action: PayloadAction<string>) {
      const newSavedThemes = { ...state.savedThemes };
      delete newSavedThemes[action.payload];
      return {
        ...state,
        savedThemes: newSavedThemes,
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
            themeObject: { ...newThemeObject },
            // themeObject: newThemeObject,
            loadedFonts: loadFontsIfRequired(
              action.payload.savedThemes[action.payload.themeId].fonts,
              state.loadedFonts,
            ),
          };
        }
        return state;
      });
  },
});

export const {
  addNewTheme,
  loadTheme,
  removeTheme,
  renameTheme,
  resetSiteData,
  setTab,
  showWarningScreen,
  toggleComponentNav,
  toggleThemeConfig,
  updateTheme,
  updateEditorState,
} = appSlice.actions;

export default appSlice.reducer;
