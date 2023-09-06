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