<script lang="ts">
	import { Resource, type ResourceTile } from '$lib/map/resources';
	import Rand from 'rand-seed';

	import DeciduousTree from './DeciduousTree.svelte';
	import EvergreenTree from './EvergreenTree.svelte';
	import { seed } from '$lib/map/store';

	export let tile: number;
	export let resources: ResourceTile;

	const random = new Rand(($seed + tile).toString());

	const wood = resources.get(Resource.WOOD);
	const treeCount = wood ? Math.floor(wood / 1000) : 0;

	const treeTypes = [DeciduousTree, EvergreenTree];
</script>

<div class="ground">
	{#each { length: treeCount } as _}
		{@const Tree = treeTypes[Math.floor(random.next() * treeTypes.length)]}
		{@const randomBottom = -50 + random.next() * 100}
		{@const randomLeft = -50 + random.next() * 100}
		<div class="tree" style="z-index: {tile}; left: {randomLeft}%; bottom: {randomBottom}%">
			<Tree />
		</div>
	{/each}
</div>

<style>
	.ground {
		position: relative;
		background-color: rgb(20, 130, 40);
	}

	.tree {
		position: absolute;
		width: 100%;
	}
</style>
