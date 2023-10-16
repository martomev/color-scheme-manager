# color-scheme-manager

`color-scheme-manager` is a service script that gives the ability to configure and control color scheme behavior.

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

### Import

First things first.
Import the module as follows:

```js
import ColorSchemeManager from '@methodev/color-scheme-manager';
```

### Configure

The imported module only has an `init` method. It takes one argument and that is a config object which has two properties. Here they are:

```js
const config = {
  systemSchemes: true,
  defaultScheme: 'light'
};
```

#### systemScheme

A `Boolean` that determines whether the logic should be mixed up with the operating system color scheme or not.

Default value: `true`

#### defaultScheme

A `String` that determines which color scheme among **light** & **dark** should be the default one.

Default value: `light`

### Initialize

Now, that we have our `config`, let's get to initialize the module and keep the manager instance that will be returned.

```js
const colorSchemeManager = ColorSchemeManager.init(config);
```

> **_NOTE:_**  You can only have one instance of the manager. If you initialize a second one, the first instance will be returned.

## Manager

### Properties

#### current

```js
// contains the value of the current color scheme
colorSchemeManager.current
```

#### defaultScheme

```js
// contains the value of default color scheme
colorSchemeManager.defaultScheme
```

#### initialScheme

```js
// contains the value of the initial color scheme which the site has entered in
colorSchemeManager.initialScheme
```

#### oppositeScheme

```js
// contains the value of the opposite color scheme to the current one
colorSchemeManager.oppositeScheme
```

### Methods

#### setScheme( scheme )

```js
// Sets a given color scheme
colorSchemeManager.setScheme(scheme) // 'light' | 'dark'
```

#### toggle()

```js
// Toggles the color scheme
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
