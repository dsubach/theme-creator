import { verbose } from 'src/utils/utils';

/**
 * loads a set of passed fonts and resolves a promise
 * when the fonts load, or fail to load
 * @param fonts
 */
export const loadFonts = async (fonts: string[]) => {
  return await new Promise<boolean>((resolve) => {
    // require inline to support server side rendering
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const WebFont = require('webfontloader');
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
