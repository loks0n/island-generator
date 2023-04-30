import { derived, writable } from 'svelte/store';
import { generateMap, type Terrain } from './generation';
import { generateResources, type ResourceTile } from './resources';

export const seed = writable<number>(999);

export const map = derived<typeof seed, Terrain[]>(seed, ($seed) => {
	return generateMap($seed);
});

export const resources = derived<[typeof seed, typeof map], ResourceTile[]>(
	[seed, map],
	([$seed, $map]) => {
		return generateResources($seed, $map);
	}
);
