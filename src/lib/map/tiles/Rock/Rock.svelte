<script lang="ts">
	import { Resource, type ResourceTile } from '$lib/map/resources';
	import Rand from 'rand-seed';
	import Iron from './Iron.svelte';
	import Stone from './Stone.svelte';
	import { seed } from '$lib/map/store';

	export let tile: number;
	export let resources: ResourceTile;

	const random = new Rand(($seed + tile).toString());

	const stone = resources.get(Resource.STONE);
	const stoneCount = stone ? Math.floor(stone / 100) : 0;

	const iron = resources.get(Resource.IRON);
	const ironCount = iron ? Math.floor(iron / 200) : 0;
</script>

<div class="rock">
	{#if stone}
		<!-- randomly rotate and position the stone-->
		{#each { length: stoneCount } as _}
			{@const randomBottom = -50 + random.next() * 100}
			{@const randomLeft = -50 + random.next() * 100}
			{@const randomRotation = random.next() * 360}
			<div
				class="stone"
				style="transform: rotate({randomRotation}deg); left: {randomLeft}%; bottom: {randomBottom}%"
			>
				<Stone />
			</div>
		{/each}
	{/if}
	{#if iron}
		<!-- randomly rotate and position the stone-->
		{#each { length: ironCount } as _}
			{@const randomBottom = -50 + random.next() * 100}
			{@const randomLeft = -50 + random.next() * 100}
			{@const randomRotation = random.next() * 360}
			<div
				class="stone"
				style="transform: rotate({randomRotation}deg); left: {randomLeft}%; bottom: {randomBottom}%"
			>
				<Iron />
			</div>
		{/each}
	{/if}
</div>

<style>
	.rock {
		background-color: rgb(82, 82, 82);
		position: relative;
	}

	.stone {
		position: absolute;
		width: 100%;
	}
</style>
