# ColorSchemeManager
> @methodev/color-scheme-manager

---

## Description

`ColorSchemeManager` is a service script that gives the ability to configure and control color scheme behavior.

## Getting Started

Install the module and its dependencies.

With NPM:

```sh
npm install @methodev/color-scheme-manager
```

With Yarn:

```sh
yarn add @methodev/color-scheme-manager
```

## Usage

To use the manager you need to go through the following three steps:

### 1. Import

First things first.
Import the module as follows:

```js
import ColorSchemeManager from '@methodev/color-scheme-manager';
```

### 2. Configure

The imported module has only an `init` method. It takes one argument and that is a config object which has two properties. Here they are:

```js
const config = {
  systemSchemes: true,
  defaultScheme: 'light'
};
```

#### systemSchemes

A `Boolean` that determines whether the logic should be mixed up with the operating system color scheme or not.

Default value: `true`

#### defaultScheme

A `String` that determines which color scheme among **light** & **dark** should be the default one when initialized for the first time.

> —
> **NOTE**
> This setting is used only when the manager is not bound to the system color schemes. Otherwise, it won't be applicable to the logic as the initial color will be determined by the current system color scheme or by a color scheme that might have been set in a cookie already.
> —

Default value: `light`

### 3. Initialize

Now that we have our `config`, let's initialize the module and store the manager instance that will be returned.

```js
const colorSchemeManager = ColorSchemeManager.init(config);
```

> —
> **NOTE**
> You can only have one instance of the manager. If you initialize a second one, the first instance will be returned.
> —

## Manager

### Properties

#### currentColorScheme

```js
// contains the value of the current color scheme
colorSchemeManager.currentColorScheme
```

#### initialScheme

```js
// contains the value of the initial color scheme of the site
// at the time the manager was initialized
colorSchemeManager.initialScheme
```

#### defaultScheme

```js
// contains the value of default color scheme
colorSchemeManager.defaultScheme
```

#### oppositeColorScheme

```js
// contains the value of the opposite color scheme to the current one
colorSchemeManager.oppositeColorScheme
```

---

> —
> **NOTE**
> There are few more properties when `systemSchemes` is set to be `true` that can be seen below.
> —

#### initialSystemScheme

```js
// contains the value of the initial system color scheme
// at the time the manager was initialized
colorSchemeManager.initialSystemScheme
```

#### currentSystemScheme

```js
// contains the value of the system color scheme
// at the moment of accessing this property
colorSchemeManager.currentSystemScheme
```

#### cookieScheme

```js
// contains the value of the manually set color scheme (if such)
colorSchemeManager.cookieScheme
```

### Methods

#### setColorScheme( scheme )

```js
// Sets a given color scheme
colorSchemeManager.setColorScheme(scheme) // 'light' | 'dark'
```

#### toggle()

```js
// Toggles between light and dark color schemes
colorSchemeManager.toggle()
```

#### setLight()

```js
// Sets light color scheme
colorSchemeManager.setLight()
```

#### setDark()

```js
// Sets dark color scheme
colorSchemeManager.setDark()
```

## Events

The manager dispatches only one custom event to the document: `color-scheme-change`.

### color-scheme-change

This event gets dispatched on every color scheme change, regardless the cause. It returns the name of the changed color scheme.

```js
document.addEventListener('color-scheme-change', (event) => {
  const { scheme } = event.detail;

  console.log(scheme) // light | dark
});
```

## Behavior

Here is an explanation to the behavior of the manager, based on all possible cases, divided into two groups:
• when the manager is initialized;
• when the manager reacts to a change.

### On initialization

> —
> **NOTE**
> A color scheme that is already set in a cookie takes priority in all initialization cases, regardless the manager is bound to the system color schemes or not.
> —

#### With system color schemes

```js
this.initialScheme = this.cookieScheme || this.currentSystemScheme;
```

When the manager is bound to the system color schemes, there isn't going to be a `defaultScheme` as it's only used to determine the initial color scheme and in this case the initial one will be determined by the current system color scheme or by a color scheme that might have been set in a cookie already. If no such, the current system color scheme will be used.

#### Without system color schemes

```js
this.initialScheme =
      CookieService.get(COLOR_SCHEME_COOKIE_NAME) || this.defaultScheme;
```

As mentioned, a color scheme set in a cookie takes priority. If no such, the `defaultScheme` value will be used.

> —
> **NOTE**
> Once a cookie is set, the `defaultScheme` will never be used again.
> —

### On change

#### With system color schemes

A change may occur by a shift in the system color scheme, or by a user action throughout some of the provided methods.

> —
> **NOTE**
> Regardless of which type of change occurred, it takes precedence over the other if the other was leading at the time of the change.
> —

##### Change of the system color scheme

If the system color scheme gets changed it will force the manager to set the new system color scheme as the new current color scheme, regardless its previous value was set by a cookie or by the old system color scheme.

And if the previous value of the current color scheme was set by a cookie, the manager will accept that the system color scheme takes precedence and the cookie will be removed, as it won't be necessary anymore due to its value that will be the same as the new system color scheme.

##### Change by a user action

If the user change the current color scheme to be the opposite of the system color scheme, a `colorScheme` cookie will be set with that value and that will be the current color scheme that will take precedence and will also be set as initial one at next initializations.

And in case the user is switching back from having a cookie with an opposite value to the system color scheme, so to return the leading role to the system, then the cookie will be removed and the system color scheme will take its precedence back.

#### Without system color schemes

A change may occur only by a user action throughout some of the provided methods and the new color scheme value will always be stored in a cookie.
