import { Theme, ThemeOptions } from '@material-ui/core';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import * as monaco from 'monaco-editor';

export interface IThemeEditor {
  editor: EditorState;
  themeId: string;
  themeObject: Theme;
  themeOptions: ThemeOptions;
  savedThemes: Record<string, SavedTheme>;
  loadedFonts: Set<string>;
  activeTab: string;
  previewSize: PreviewSize;
  componentNavOpen: boolean;
  themeConfigOpen: boolean;
  mobileWarningSeen: boolean;
}

export interface SavedTheme {
  id: string;
  name: string;
  themeOptions: ThemeOptions;
  fonts: string[];
  lastUpdated: string;
}

export interface IPersistedState {
  editor: EditorState;
  themeId: string;
  themeOptions: ThemeOptions;
  savedThemes: Record<string, SavedTheme>;
}

export interface EditorState {
  themeInput: string;
  initialVersion: number;
  lastVersion: number;
  currentVersion: number;
  savedVersion: number;
  canUndo: boolean;
  canRedo: boolean;
  errors: monaco.languages.typescript.Diagnostic[];
  formatOnSave: boolean;
  outputTypescript: boolean;
}

export type EditorStateOptions = Partial<EditorState>;

export type NewSavedTheme = Omit<SavedTheme, 'id'>;

export type PreviewSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export type AppThunkAction = ThunkAction<void, IThemeEditor, unknown, AnyAction>;
