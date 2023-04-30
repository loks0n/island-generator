<script lang="ts">
	import CanvasMap from '$lib/map/CanvasMap.svelte';
	import HtmlMap from '$lib/map/HTMLMap.svelte';
	import { seed } from '$lib/map/store';

	let useCanvas = false;
</script>

<header>
	<h1>Island Generator</h1>
	<div>
		<label for="seed">Seed:</label>
		<input id="seed" name="seed" type="number" bind:value={$seed} />
	</div>

	<div>
		<label for="useCanvas">Use Canvas:</label>
		<input id="useCanvas" name="useCanvas" type="checkbox" bind:checked={useCanvas} />
	</div>
</header>

{#if useCanvas}
	<CanvasMap />
{:else}
	<HtmlMap />
{/if}

<style>
	header {
		gap: 1em;
		display: flex;
		align-items: center;
		max-width: min(90vh, 90vw);
	}

	h1 {
		flex: 1;
	}
</style>
