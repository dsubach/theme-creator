import React, { useEffect, useRef } from 'react';

import { useEditor } from './hooks/useEditor';
import { useEditorStateSync } from './hooks/useEditorStateSync';
import { useReadOnlyLines } from './hooks/useReadOnlyLines';
import { useSave } from './hooks/useSave';
import { useUndoRedo } from './hooks/useUndoRedo';
import './editor.css';
import * as monaco from 'monaco-editor';
import { EditorControls } from './editorControls/EditorControls';
import { EditorErrors } from './editorErrors/EditorErrors';
import { verbose } from 'src/utils/utils';
import { useStyles } from './MonacoThemeCodeEditor.styles';

export const codeEditorId = 'code-editor';

const MonacoThemeCodeEditor = () => {
  const classes = useStyles();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // set up editor and configure options
  useEditor(editorRef);
  useEditorStateSync(editorRef);
  useReadOnlyLines(editorRef);

  // set Save and Undo/Redo listeners, and get handlers
  const handleSave = useSave(editorRef);
  const { handleRedo, handleUndo } = useUndoRedo(editorRef);

  useEffect(() => {
    return () => {
      verbose('MonacoThemeCodeEditor unmounted');
    };
  }, []);

  return (
    <div id="code-editor" className={classes.monacoThemeEditorRoot}>
      <EditorControls onUndo={handleUndo} onRedo={handleRedo} onSave={handleSave} />
      <div id="container" className={classes.container} />
      <EditorErrors editorRef={editorRef} />
    </div>
  );
};

export default MonacoThemeCodeEditor;
