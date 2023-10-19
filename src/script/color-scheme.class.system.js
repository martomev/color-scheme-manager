import ColorSchemeBase from './color-scheme.class.base';
import CookieService from './color-scheme.service.cookie';
import { COLOR_SCHEME_COOKIE_NAME } from './color-scheme.constants';

let instance;

export default class SystemRelatedColorScheme extends ColorSchemeBase {
  #_initialSystemScheme;

  #_cookieScheme;

  constructor(config) {
    super(config);

    if (instance) {
      return instance;
    }

    instance = this;

    this.initialSystemScheme = this.currentSystemScheme;
    this.cookieScheme = CookieService.get(COLOR_SCHEME_COOKIE_NAME);
  }

  get initialSystemScheme() {
    return this.#_initialSystemScheme;
  }

  set initialSystemScheme(value) {
    this.#_initialSystemScheme = value;
  }

  get cookieScheme() {
    return this.#_cookieScheme;
  }

  set cookieScheme(value) {
    this.#_cookieScheme = value;
  }

  get currentSystemScheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  #addCookieColorScheme(scheme) {
    this.cookieScheme = scheme;
    this.mountCookieColorScheme(scheme);

    return this;
  }

  #removeCookieColorScheme() {
    this.cookieScheme = null;
    this.unmountCookieColorScheme();

    return this;
  }

  init() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (this.currentScheme === this.currentSystemScheme) {
          this.#removeCookieColorScheme();
        } else {
          this.setScheme(this.currentSystemScheme);
        }
      });

    document.addEventListener('color-scheme-change', (event) => {
      const { scheme } = event.detail;

      if (scheme === this.currentSystemScheme) {
        this.#removeCookieColorScheme();
      } else {
        this.#addCookieColorScheme(scheme);
      }
    });

    this.initialScheme = this.cookieScheme || this.currentSystemScheme;

    // Set initial scheme
    this.setScheme(this.initialScheme);

    return this;
  }
}
