import { COLOR_SCHEME_COOKIE_DEFAULT_LIFECYCLE_DAYS } from './color-scheme.constants';

export default {
  set(
    cookieName,
    value,
    lifecycle = COLOR_SCHEME_COOKIE_DEFAULT_LIFECYCLE_DAYS
  ) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + lifecycle);
    document.cookie = `${cookieName}=${value}; expires=${expirationDate.toUTCString()}`;
  },

  get(cookieName) {
    const cookies = document.cookie.split('; ');
    const parsedCookies = {};

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split('=');
      // Decoding the cookie value in case it contains special characters
      parsedCookies[name] = decodeURIComponent(value);
    });

    return parsedCookies[cookieName];
  },

  delete(cookieName) {
    const pastDate = new Date(0); // Set to a date in the past
    document.cookie = `${cookieName}=; expires=${pastDate.toUTCString()}; path=/`;
  }
};
