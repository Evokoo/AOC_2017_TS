// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		distance = findPosition(directions);

	return distance;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		distance = findPosition(directions, true);

	return distance;
}

//Run
solveA("example_a", "11");

// Functions
type Position = { q: number; r: number };

function parseInput(data: string) {
	return data.split(",");
}
function updatePosition(current: Position, direction: string): Position {
	switch (direction) {
		case "n":
			current.r++;
			break;
		case "s":
			current.r--;
			break;
		case "ne":
			current.q++;
			break;
		case "nw":
			current.q--;
			current.r++;
			break;
		case "se":
			current.q++;
			current.r--;
			break;
		case "sw":
			current.q--;
			break;
		default:
			throw new Error("Invalid Direction");
	}

	return current;
}
function getDistance(a: Position, b: Position): number {
	return (
		(Math.abs(a.q - b.q) +
			Math.abs(a.r - b.r) +
			Math.abs(a.q + a.r - b.q - b.r)) /
		2
	);
}
function findPosition(directions: string[], partB: boolean = false): number {
	let position = { q: 0, r: 0 };
	let maxDistance = 0;

	for (let direction of directions) {
		position = updatePosition(position, direction);
		maxDistance = Math.max(maxDistance, getDistance({ q: 0, r: 0 }, position));
	}

	return partB ? maxDistance : getDistance({ q: 0, r: 0 }, position);
}
