import { writable } from "svelte/store";
import type { ThemeProviderProps, UseThemeProps } from "./types";

export const themeStore = writable<UseThemeProps>({ themes: ["light", "dark"], setTheme: (theme) => { } })