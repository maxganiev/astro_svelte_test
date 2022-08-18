import { defineConfig } from 'astro/config';
//import preprocess from 'svelte-preprocess';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
	integrations: [svelte()],
	//preprocess: preprocess({}),
});
