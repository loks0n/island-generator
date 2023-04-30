<script lang="ts">
	import { seed } from '$lib/map/store';
	import Game from '../lib/Game.svelte';
</script>

<div>
	<h1>Island Generator</h1>
	<label for="seed">Seed:</label>
	<input id="seed" name="seed" type="number" bind:value={$seed} />
</div>

<Game />

<style>
	div {
		gap: 1em;
		display: flex;
		align-items: center;
		max-width: min(90vh, 90vw);
	}

	h1 {
		flex: 1;
	}
</style>
