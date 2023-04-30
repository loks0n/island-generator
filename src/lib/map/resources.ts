import { Terrain } from './generation';
import Rand from 'rand-seed';

export enum Resource {
	WOOD = 'wood',
	STONE = 'stone',
	IRON = 'iron'
}

export type ResourceTile = Map<Resource, number>;

export function generateResources(seed: number, map: Terrain[]): ResourceTile[] {
	const random = new Rand(seed.toString());
	return map.map((terrain) => {
		switch (terrain) {
			case Terrain.FOREST:
				return new Map([[Resource.WOOD, Math.floor(random.next() * 5000)]]);
			case Terrain.ROCK:
				return new Map([
					random.next() < 0.025
						? [Resource.STONE, Math.floor(random.next() * 2000)]
						: [Resource.STONE, 0],
					random.next() < 0.005
						? [Resource.IRON, Math.floor(random.next() * 2000)]
						: [Resource.IRON, 0]
				]);

			default:
				return new Map();
		}
	});
}
