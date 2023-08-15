<script>
  import ThemeWrapper from "./lib/ThemeWrapper.svelte";
  import { themeStore } from "./stores";
</script>

<ThemeWrapper>
  <div>
    The current theme is: {$themeStore.theme}
    <button on:click={() => $themeStore.setTheme("light")}>Light Mode</button>
    <button on:click={() => $themeStore.setTheme("dark")}>Dark Mode</button>
  </div>
</ThemeWrapper>
