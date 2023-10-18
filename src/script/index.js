import NonSystemRelatedColorScheme from './color-scheme.class.non-system';
import SystemRelatedColorScheme from './color-scheme.class.system';

export default {
  init({ systemSchemes = true, defaultScheme = 'light' } = {}) {
    class ColorSchemeManager extends (systemSchemes && window.matchMedia
      ? SystemRelatedColorScheme
      : NonSystemRelatedColorScheme) {}

    return Object.freeze(new ColorSchemeManager({ defaultScheme })).init();
  }
};
