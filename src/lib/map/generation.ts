import { makeNoise2D } from 'open-simplex-noise';
import Rand from 'rand-seed';

export enum Terrain {
	WATER,
	SAND,
	GRASS,
	FOREST,
	ROCK,
	MOUNTAIN,
	SWAMP,
	SNOW
}

const width = 60;
const height = 60;
const borderWidth = 10;

const frequency = 0.07;
const moistureFrequency = 0.05;
const mountainFrequency = 0.03;
const riverFrequency = 0.08;
const lakeFrequency = 0.1;
const mountainThreshold = 0.6;
const riverThreshold = 0.85;
const lakeThreshold = 0.75;

function getIndex(x: number, y: number): number {
	return y * width + x;
}

function isInsideMap(x: number, y: number): boolean {
	return x >= 0 && x < width && y >= 0 && y < height;
}

function borderInfluence(x: number, y: number): number {
	const distanceX = Math.min(x, width - 1 - x);
	const distanceY = Math.min(y, height - 1 - y);
	const distanceToBorder = Math.min(distanceX, distanceY);
	return Math.max(0, (borderWidth - distanceToBorder) / borderWidth);
}

export function generateMap(seed: number): Terrain[] {
	const random = new Rand(seed.toString());

	const elevationNoise = makeNoise2D(seed);
	const moistureNoise = makeNoise2D(seed + 1);
	const mountainNoise = makeNoise2D(seed + 2);
	const riverNoise = makeNoise2D(seed + 3);
	const lakeNoise = makeNoise2D(seed + 4);

	const map: Terrain[] = Array(width * height).fill(Terrain.WATER);

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const index = getIndex(x, y);
			const elevationWithoutInfluence = (elevationNoise(x * frequency, y * frequency) + 1) / 2;
			const influence = borderInfluence(x, y);
			const elevation = elevationWithoutInfluence * (1 - influence);
			const moisture = (moistureNoise(x * moistureFrequency, y * moistureFrequency) + 1) / 2;
			const mountainValue = (mountainNoise(x * mountainFrequency, y * mountainFrequency) + 1) / 2;
			const riverValue = (riverNoise(x * riverFrequency, y * riverFrequency) + 1) / 2;

			// Biomes based on elevation, moisture, and mountain values
			if (elevation < 0.35) {
				map[index] = Terrain.WATER;
			} else if (elevation < 0.45) {
				map[index] = Terrain.SAND;
			} else if (elevation < 0.65) {
				if (moisture < 0.5) {
					map[index] = Terrain.GRASS;
				} else if (moisture < 0.75) {
					map[index] = Terrain.FOREST;
				} else {
					map[index] = Terrain.SWAMP;
				}
			} else if (elevation < 0.75) {
				if (mountainValue > mountainThreshold) {
					map[index] = Terrain.ROCK;
				} else {
					map[index] = Terrain.FOREST;
				}
			} else if (elevation < 0.85) {
				map[index] = Terrain.ROCK;
			} else if (elevation < 0.9) {
				map[index] = Terrain.MOUNTAIN;
			} else {
				map[index] = Terrain.SNOW;
			}

			// Add rivers if the river value exceeds the threshold and the terrain is not a mountain
			if (riverValue > riverThreshold && elevation < 0.7) {
				map[index] = Terrain.WATER;
			}
		}
	}

	// Add lakes
	for (let y = borderWidth; y < height - borderWidth; y++) {
		for (let x = borderWidth; x < width - borderWidth; x++) {
			const index = getIndex(x, y);
			const lakeValue = (lakeNoise(x * lakeFrequency, y * lakeFrequency) + 1) / 2;

			// Add a lake if the lake value exceeds the threshold and the terrain is not a mountain
			if (lakeValue > lakeThreshold && map[index] !== Terrain.MOUNTAIN) {
				map[index] = Terrain.WATER;
			}
		}
	}

	// Add sand around lakes and rivers
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const index = getIndex(x, y);
			if (map[index] === Terrain.WATER) {
				const neighbors = [
					{ dx: -1, dy: 0 },
					{ dx: 1, dy: 0 },
					{ dx: 0, dy: -1 },
					{ dx: 0, dy: 1 },
					{ dx: -1, dy: -1 },
					{ dx: 1, dy: -1 },
					{ dx: -1, dy: 1 },
					{ dx: 1, dy: 1 }
				];

				for (const neighbor of neighbors) {
					const nx = x + neighbor.dx;
					const ny = y + neighbor.dy;
					const nIndex = getIndex(nx, ny);
					if (isInsideMap(nx, ny) && map[nIndex] !== Terrain.WATER && random.next() < 0.25) {
						map[nIndex] = Terrain.SAND;
					}
				}
			}
		}
	}

	return map;
}
