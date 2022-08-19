<!--using regular script-->
<script>
	export let fetchedData;

	async function getData() {
		const req = await fetch('/api/getItems');
		const res = await req.json();

		console.log(res);
		fetchedData = res;
	}

	//if uncommented on initial load - returns this error:
	// 	Uncaught (in promise) TypeError: Failed to fetch dynamically imported module: http://localhost:3000/@id/astro:scripts/before-hydration.js
	// await (async)
	// hasAttribute.firstChild.MutationObserver.observe.childList @ (index):16

	//if comment function call on init call but uncomment when page is rendered - returns array in console.log inside getData, but still fails to render html with following error:
	//proxy.js:19 Error: {#each} only iterates over array-like objects.
	//getData();
</script>

<!--Sveltekit approach - api never get called-->

<!-- <script context="module">
<script context="module">
	export async function load({ fetch }) {
		const req = await fetch('/api/getItems');
		const res = await req.json();

		return { props: { fetchedData: res } };
	}
</script>

<script>
	import { items } from '../stores/items';

	export let fetchedData;

	$: {
		items.setList(fetchedData);
	}
</script>
</script> -->

<ul>
	{#each fetchedData as item}
		<li>{item.name}</li>
	{/each}
</ul>
