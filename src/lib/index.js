// Reexport your entry components here

import Theme from '$lib/ThemeWrapper.svelte';
import { themeStore as store } from '$lib/stores.js';


export const ThemeWrapper=Theme;

export const themeStore=store;
