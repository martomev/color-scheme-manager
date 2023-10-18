import ColorSchemeBase from './color-scheme.class.base';
import CookieService from './color-scheme.service.cookie';
import { COLOR_SCHEME_COOKIE_NAME } from './color-scheme.constants';

let instance;

export default class SystemRelatedColorScheme extends ColorSchemeBase {
  #_initialSystemColorScheme;

  #_cookieColorScheme;

  constructor(config) {
    super(config);

    if (instance) {
      return instance;
    }

    instance = this;

    this.initialSystemColorScheme = this.currentSystemScheme;
    this.cookieColorScheme = CookieService.get(COLOR_SCHEME_COOKIE_NAME);
  }

  get initialSystemColorScheme() {
    return this.#_initialSystemColorScheme;
  }

  set initialSystemColorScheme(value) {
    this.#_initialSystemColorScheme = value;
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

    this.initialScheme = this.cookieColorScheme || this.currentSystemScheme;

    // Set initial scheme
    this.setScheme(this.initialScheme);

    return this;
  }
}
