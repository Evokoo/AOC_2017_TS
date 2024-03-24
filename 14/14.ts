// Imports
import TOOLS from "../00/tools";
import { getKnotHash } from "../10/10";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ points } = getCoordinates(data);

	return points.length;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ grid } = getCoordinates(data),
		regions = findRegions(grid);

	return regions;
}

//Run
solveB("example_b", "14");

// Functions
type Point = { x: number; y: number };

function getCoordinates(input: string) {
	const points: Point[] = [];
	const grid = [];

	for (let y = 0; y < 128; y++) {
		const knotHash = getKnotHash(`${input}-${y}`);
		const bits = [...knotHash]
			.map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
			.join("");

		for (let x = 0; x < 128; x++) {
			if (bits[x] === "1") points.push({ x, y });
		}

		grid.push(bits);
	}

	return { points, grid };
}
function findRegions(grid: string[]) {
	const seen: Set<string> = new Set();
	let regionCount = 0;

	for (let y = 0; y < 128; y++) {
		for (let x = 0; x < 128; x++) {
			if (grid[y][x] === "0") continue;

			if (seen.has(JSON.stringify({ x, y }))) {
				continue;
			} else {
				for (let coord of DFS({ x, y }, grid)) {
					seen.add(coord);
				}
				regionCount++;
			}
		}
	}

	return regionCount;
}
function DFS(point: Point, grid: string[]) {
	const region: Set<string> = new Set();
	const queue: Point[] = [point];

	while (queue.length) {
		const current = queue.pop()!;

		region.add(JSON.stringify(current));

		for (let [nx, ny] of [
			[0, 1],
			[1, 0],
			[-1, 0],
			[0, -1],
		]) {
			const [x, y] = [nx + current.x, ny + current.y];

			if (x < 0 || x >= 128 || y < 0 || y >= 128) continue;
			if (grid[y][x] === "0") continue;
			if (region.has(JSON.stringify({ x, y }))) continue;

			queue.push({ x, y });
		}
	}

	return region;
}
