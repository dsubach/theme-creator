import { EditorRefType } from '../types';
import { useEffect } from 'react';

import { verbose } from 'src/utils/utils';
import { useAppDispatch } from 'src/state/hooks';
import { updateVersionStates, useUpdateEditorState } from 'src/state/actions';

export const useUndoRedo = (editorRef: EditorRefType) => {
  const updateEditorState = useUpdateEditorState();

  // handle initial configuration of undo/redo state properties
  useEffect(() => {
    const initialVersionId = editorRef.current?.getModel()?.getAlternativeVersionId();

    // set initial versions
    updateEditorState({
      initialVersion: initialVersionId,
      currentVersion: initialVersionId,
      lastVersion: initialVersionId,
      savedVersion: initialVersionId,
    });
  }, []);

  useTrackUndoRedoState(editorRef);
  return useUndoRedoHandlers(editorRef);
};

const useTrackUndoRedoState = (editorRef: EditorRefType) => {
  const dispatch = useAppDispatch();

  const handleContentChange = () => {
    const nextVersionId = editorRef.current?.getModel()?.getAlternativeVersionId() ?? 0;

    dispatch(updateVersionStates(nextVersionId));
  };

  useEffect(() => {
    // set up event handler for editor changes
    const modelContentChangeBinding =
      editorRef.current?.onDidChangeModelContent(handleContentChange);

    return () => {
      modelContentChangeBinding?.dispose();
    };
  }, []);
};

const useUndoRedoHandlers = (editorRef: EditorRefType) => {
  const handleRedo = () => {
    verbose('MonacoThemeCodeEditor/hooks/useUndoRedo -> handleRedo: global redo listener fired');
    editorRef.current?.trigger('MonacoThemeCodeEditor', 'redo', null);
    editorRef.current?.focus();
  };

  const handleUndo = () => {
    verbose('MonacoThemeCodeEditor/hooks/useUndoRedo -> handleUndo: global undo listener fired');
    editorRef.current?.trigger('MonacoThemeCodeEditor', 'undo', null);
    editorRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (event.code === 'KeyZ') {
        handleUndo();
      }
      if (event.code === 'KeyY') {
        handleRedo();
      }
    }
  };

  // set up event listener to handle Ctrl+Z or Ctrl+Y keydowns
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // return the handlers to be used on undo/redo
  return { handleRedo, handleUndo };
};
