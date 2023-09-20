# Svelte-Theme-Switch

Dark/Light mode in Svelte.

Ported from [next-themes](https://github.com/pacocoursey/next-themes)


## Install

```bash
$ npm install svelte-theme-switch
# or
$ yarn add svelte-theme-switch
```

## Usage

### In your `+layout.svelte` file
```svelte
<sript>
      import { ThemeWrapper } from "svelte-theme-switch";
</script>

<ThemeWrapper>
    <slot/>
</ThemeWrapper>
```


### In your Component file
```svelte
<sript>
      import { themeStore } from "svelte-theme-switch";
</script>

<p>Current theme is {$themeStore.theme}</p>

<button
    on:click={() =>
      $themeStore.setTheme($themeStore.theme === "light" ? "dark" : "light")}
>
    Switch Theme
</button>
```

### ThemeProvider

All your theme configuration is passed to ThemeProvider.

- `storageKey = 'theme'`: Key used to store theme setting in localStorage
- `defaultTheme = 'system'`: Default theme name (for v0.0.12 and lower the default was `light`). If `enableSystem` is false, the default theme is `light`
- `forcedTheme`: Forced theme name for the current page (does not modify saved theme settings)
- `enableSystem = true`: Whether to switch between `dark` and `light` based on `prefers-color-scheme`
- `enableColorScheme = true`: Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons
- `disableTransitionOnChange = false`: Optionally disable all CSS transitions when switching themes ([example](#disable-transitions-on-theme-change))
- `themes = ['light', 'dark']`: List of theme names
- `attribute = 'data-theme'`: HTML attribute modified based on the active theme
  - accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) ([example](#class-instead-of-data-attribute))
- `value`: Optional mapping of theme name to attribute value
  - value is an `object` where key is the theme name and value is the attribute value ([example](#differing-dom-attribute-and-theme-name))
- `nonce`: Optional nonce passed to the injected `script` tag, used to allow-list the next-themes script in your CSP

### useTheme

useTheme takes no parameters, but returns:

- `theme`: Active theme name
- `setTheme(name)`: Function to update the theme
- `forcedTheme`: Forced page theme or falsy. If `forcedTheme` is set, you should disable any theme switching UI
- `resolvedTheme`: If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme`
- `systemTheme`: If `enableSystem` is true, represents the System theme preference ("dark" or "light"), regardless what the active theme is
- `themes`: The list of themes passed to `ThemeProvider` (with "system" appended, if `enableSystem` is true)