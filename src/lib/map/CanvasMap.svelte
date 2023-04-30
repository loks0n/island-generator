<script lang="ts">
	import { onMount } from 'svelte';
	import { Terrain, getIndex } from './generation';
	import { map } from './store';

	let canvas: HTMLCanvasElement;

	const width = 60;
	const height = 60;
	const scaleFactor = 12; // Add this line to define the scale factor

	const terrainColors: Record<Terrain, string> = {
		[Terrain.WATER]: '#61a9c2',
		[Terrain.SAND]: '#c9c976',
		[Terrain.GRASS]: '#1f9f1f',
		[Terrain.FOREST]: '#148228',
		[Terrain.ROCK]: '#525252',
		[Terrain.MOUNTAIN]: '#767676',
		[Terrain.SWAMP]: '#536750',
		[Terrain.SNOW]: '#FFFFFF'
	};

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	$: {
		if (mounted) {
			const ctx = canvas.getContext('2d');
			if (ctx) {
				for (let y = 0; y < height; y++) {
					for (let x = 0; x < width; x++) {
						const index = getIndex(x, y);
						ctx.fillStyle = terrainColors[$map[index]];
						ctx.fillRect(x * scaleFactor, y * scaleFactor, scaleFactor, scaleFactor); // Update this line
					}
				}
			}
		}
	}
</script>

<canvas width="{scaleFactor * width}px" height="{scaleFactor * height}px" bind:this={canvas} />

<style>
	canvas {
		border-radius: 0.5em;
	}
</style>
