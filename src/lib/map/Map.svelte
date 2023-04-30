<script lang="ts">
	import { Terrain } from './generation';
	import Forest from './tiles/Forest/Forest.svelte';
	import Rock from './tiles/Rock/Rock.svelte';

	import { map, resources } from './store';
</script>

<div class="map">
	{#each $map as tile, index}
		{#if tile === Terrain.FOREST}
			<Forest tile={index} resources={$resources[index]} />
		{:else if tile === Terrain.ROCK}
			<Rock tile={index} resources={$resources[index]} />
		{:else}
			<div
				class="tile"
				class:water={tile === Terrain.WATER}
				class:sand={tile === Terrain.SAND}
				class:grass={tile === Terrain.GRASS}
				class:mountain={tile === Terrain.MOUNTAIN}
				class:swamp={tile === Terrain.SWAMP}
				class:snow={tile === Terrain.SNOW}
			/>
		{/if}
	{/each}
</div>

<style>
	.map {
		aspect-ratio: 1/1;
		border-radius: 0.5em;
		max-height: min(90vh, 90vw);
		display: grid;
		filter: blur(0.2px);
		grid-template-columns: repeat(60, 1fr);
		grid-template-rows: repeat(60, 1fr);
		background-color: rgb(97, 169, 194);
		background-size: 200% 200%;
	}

	.tile.sand {
		background-color: rgb(201, 201, 118);
	}

	.tile.grass {
		background-color: rgb(31, 159, 31);
	}

	.tile.mountain {
		background-color: rgb(118, 118, 118);
	}

	.tile.swamp {
		background-color: rgb(83, 103, 80);
	}

	.tile.snow {
		background-color: white;
	}
</style>
