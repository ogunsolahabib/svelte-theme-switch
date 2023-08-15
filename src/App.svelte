<script>
  import { onMount } from "svelte";
  import ThemeWrapper from "./lib/ThemeWrapper.svelte";
  import { themeStore } from "./stores";

  let setTheme;
  let theme;
  let themeStoreLocal;
  themeStore.subscribe((val) => {
    setTheme = val.setTheme;
    theme = val.theme;
    themeStoreLocal = { ...val };
  });

  // const { theme, setTheme } = $themeStore;
</script>

svelte
<ThemeWrapper>
  <p>Test</p>

  <div>
    The current theme is: {theme}
    <button on:click={() => setTheme("light")}>Light Mode</button>
    <button on:click={() => setTheme("dark")}>Dark Mode</button>
  </div>
</ThemeWrapper>
