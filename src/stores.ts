import { writable } from "svelte/store";
import type { ThemeProps } from "./types.js";


export const themeStore = writable<ThemeProps>({ themes: ["light", "dark"], setTheme: _ => { } })