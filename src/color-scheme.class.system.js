import ColorSchemeBase from './color-scheme.class.base';
import CookieService from './color-scheme.service.cookie';
import { COLOR_SCHEME_COOKIE_NAME } from './color-scheme.constants';

let instance;

export default class SystemRelatedColorScheme extends ColorSchemeBase {
  #_initialSystemColorScheme;

  #_systemColorScheme;

  #_cookieColorScheme;

  constructor(config) {
    super(config);

    if (instance) {
      return instance;
    }

    instance = this;

    this.initialSystemColorScheme = this.currentSystemScheme;
    this.systemColorScheme = this.initialSystemColorScheme;
    this.cookieColorScheme = CookieService.get(COLOR_SCHEME_COOKIE_NAME);
  }

  get initialSystemColorScheme() {
    return this.#_initialSystemColorScheme;
  }

  set initialSystemColorScheme(value) {
    this.#_initialSystemColorScheme = value;
  }

  get systemColorScheme() {
    return this.#_systemColorScheme;
  }

  set systemColorScheme(value) {
    this.#_systemColorScheme = value;
  }

  get cookieColorScheme() {
    return this.#_cookieColorScheme;
  }

  set cookieColorScheme(value) {
    this.#_cookieColorScheme = value;
  }

  get currentSystemScheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  #addCookieColorScheme(scheme) {
    this.cookieColorScheme = scheme;
    this.mountCookieColorScheme(scheme);

    return this;
  }

  #removeCookieColorScheme() {
    this.cookieColorScheme = null;
    this.unmountCookieColorScheme();

    return this;
  }

  init() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        this.systemColorScheme = this.currentSystemScheme;
        this.current = this.currentSystemScheme;
        this.#removeCookieColorScheme();
      });

    document.addEventListener('color-scheme-change', (event) => {
      const { scheme } = event.detail;

      if (scheme === this.systemColorScheme) {
        this.#removeCookieColorScheme();
      } else {
        this.#addCookieColorScheme(scheme);
      }
    });

    this.initialScheme = this.cookieColorScheme || this.systemColorScheme;

    // Set initial scheme
    this.setScheme(this.initialScheme);

    return this;
  }
}
