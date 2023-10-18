import ColorSchemeBase from './color-scheme.class.base';
import CookieService from './color-scheme.service.cookie';
import { COLOR_SCHEME_COOKIE_NAME } from './color-scheme.constants';

let instance;

export default class NonSystemRelatedColorScheme extends ColorSchemeBase {
  constructor(config) {
    super(config);

    if (instance) {
      return instance;
    }

    instance = this;
  }

  init() {
    document.addEventListener('color-scheme-change', (event) => {
      const { scheme } = event.detail;

      this.unmountCookieColorScheme().mountCookieColorScheme(scheme);
    });

    this.initialScheme =
      CookieService.get(COLOR_SCHEME_COOKIE_NAME) || this.defaultScheme;

    // Set initial scheme
    this.setScheme(this.initialScheme);

    return this;
  }
}
