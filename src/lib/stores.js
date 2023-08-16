import { writable } from "svelte/store";


export const themeStore = writable({ themes: ["light", "dark"], setTheme: _ => { } })