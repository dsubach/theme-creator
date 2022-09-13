import Loadable from '@loadable/component';

import MonacoThemeCodeEditor from './MonacoThemeCodeEditor';

export default Loadable(async () => await import('./MonacoThemeCodeEditor'));

export const codeEditorId = 'code-editor';
