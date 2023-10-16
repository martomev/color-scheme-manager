import CookieService from './color-scheme.service.cookie';
import { COLOR_SCHEME_COOKIE_NAME } from './color-scheme.constants';

export default class ColorSchemeBase {
  #_current;

  #_initialScheme;

  #_defaultScheme;

  constructor({ defaultScheme = 'light' }) {
    this.#_defaultScheme = defaultScheme;
  }

  get current() {
    return this.#_current;
  }

  set current(value) {
    this.#_current = value;
  }

  get initialScheme() {
    return this.#_initialScheme;
  }

  set initialScheme(value) {
    this.#_initialScheme = value;
  }

  get defaultScheme() {
    return this.#_defaultScheme;
  }

  set defaultScheme(value) {
    this.#_defaultScheme = value;
  }

  get oppositeScheme() {
    return this.current === 'light' ? 'dark' : 'light';
  }

  mountCookieColorScheme(scheme) {
    document.documentElement.classList.add(scheme);
    CookieService.set(COLOR_SCHEME_COOKIE_NAME, scheme);

    return this;
  }

  unmountCookieColorScheme() {
    document.documentElement.classList.remove('light', 'dark');
    CookieService.delete(COLOR_SCHEME_COOKIE_NAME);

    return this;
  }

  setScheme(scheme) {
    this.current = scheme;

    document.dispatchEvent(
      new CustomEvent('color-scheme-change', { detail: { scheme } })
    );

    return this;
  }

  setLight() {
    this.setScheme('light');

    return this;
  }

  setDark() {
    this.setScheme('dark');

    return this;
  }

  toggle() {
    this.setScheme(this.oppositeScheme);

    return this;
  }
}
