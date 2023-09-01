import { writable } from "svelte/store";


export const themeStore = writable({
    theme: "light",
    forcedTheme: "",
    resolvedTheme: "",
    enableSystem: false,
    systemTheme: "",
    themes: ["light", "dark"],
    setTheme: _ => { }
 })
