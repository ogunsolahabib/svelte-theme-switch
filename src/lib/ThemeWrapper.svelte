<script>
	import { onDestroy } from 'svelte';
	import ThemeScript from './ThemeScript.svelte';
	import { themeStore } from '$lib/stores.js';

	const defaultThemes = ['light', 'dark'];

	export let forcedTheme = undefined;
	export let disableTransitionOnChange = false;
	export let enableSystem = true;
	export let enableColorScheme = true;
	export let storageKey = 'theme';
	export let themes = defaultThemes;
	export let defaultTheme = enableSystem ? 'system' : 'light';
	export let attribute = 'data-theme';
	export let value = undefined;
	export let nonce = undefined;

	const MEDIA = '(prefers-color-scheme: dark)';

	const isServer = typeof window === 'undefined';

	const getTheme = (key, fallback) => {
		if (isServer) return undefined;
		let theme;
		try {
			theme = localStorage.getItem(key) || undefined;
		} catch (e) {
			// Unsupported
		}
		return theme || fallback;
	};
	const initialTheme = getTheme(storageKey, defaultTheme);

	let theme = initialTheme;

	const initialResolvedTheme = getTheme(storageKey);

	let resolvedTheme = initialResolvedTheme;

	const attrs = !value ? themes : Object.values(value);

	const disableAnimation = () => {
		const css = document.createElement('style');
		css.appendChild(
			document.createTextNode(
				`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
			)
		);
		document.head.appendChild(css);

		return () => {
			// Force restyle
			(() => !isServer && window.getComputedStyle(document.body))();

			// Wait for next tick before removing
			setTimeout(() => {
				document.head.removeChild(css);
			}, 1);
		};
	};

	const getSystemTheme = (e) => {
		if (isServer) return;
		if (!e) e = window.matchMedia(MEDIA);
		const isDark = e.matches;

		const systemTheme = isDark ? 'dark' : 'light';
		return systemTheme;
	};

	const colorSchemes = ['light', 'dark'];

	$: applyTheme = (theme) => {
		let resolved = theme;
		if (!resolved) return;

		// If theme is system, resolve it before setting theme
		if (theme === 'system' && enableSystem) {
			resolved = getSystemTheme();
		}

		const name = value ? value[resolved] : resolved;
		const enable = disableTransitionOnChange ? disableAnimation() : null;
		const d = document.documentElement;

		if (attribute === 'class') {
			d.classList.remove(...attrs);

			if (name) d.classList.add(name);
		} else {
			if (name) {
				d.setAttribute(attribute, name);
			} else {
				d.removeAttribute(attribute);
			}
		}

		if (enableColorScheme) {
			const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
			const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
			// @ts-ignore
			d.style.colorScheme = colorScheme;
		}

		enable?.();
	};

	$: setTheme = (newTheme) => {
		theme = newTheme;

		forcedTheme = forcedTheme;

		// Save to storage
		try {
			localStorage.setItem(storageKey, newTheme);
		} catch (e) {
			// Unsupported
		}
	};

	$: handleMediaQuery = (e) => {
		const resolved = getSystemTheme(e);
		resolvedTheme = resolved;

		if (theme === 'system' && enableSystem && !forcedTheme) {
			applyTheme('system');
		}
	};

	const media = !isServer ? window.matchMedia(MEDIA) : undefined;

	$: handleStorage = (e) => {
		if (e.key !== storageKey) {
			return;
		}

		// If default theme set, use it if localstorage === null (happens on local storage manual deletion)
		const theme = e.newValue || defaultTheme;
		setTheme(theme);
	};

	$: themeStoreUpdated = {
		theme,
		setTheme,
		forcedTheme,
		resolvedTheme: theme === 'system' ? resolvedTheme : theme,
		themes: enableSystem ? [...themes, 'system'] : themes,
		systemTheme: enableSystem ? resolvedTheme : undefined
	};

	$: themeStore.update((val) => ({ ...val, ...themeStoreUpdated }));
	$: (() => {
		// Intentionally use deprecated listener methods to support iOS & old browsers
		if (!isServer) {
			media.addListener(handleMediaQuery);
			handleMediaQuery(media);
			window.addEventListener('storage', handleStorage);
			applyTheme(forcedTheme ?? theme);
		}
	})();

	onDestroy(() => {
		media.removeListener(handleMediaQuery);

		!isServer && window.removeEventListener('storage', handleStorage);
	});
</script>

<ThemeScript
	{...{
		forcedTheme,
		disableTransitionOnChange,
		enableSystem,
		enableColorScheme,
		storageKey,
		themes,
		defaultTheme,
		attribute,
		value,
		attrs,
		nonce
	}}
/>
<slot />
