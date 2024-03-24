// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		distance = TOOLS.manhattanDistance({ x: 0, y: 0 }, getCoordinate(+data));

	return distance;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "03");

// Functions
type Point = { x: number; y: number };

function getCoordinate(n: number): Point {
	let k = Math.ceil((Math.sqrt(n) - 1) / 2);
	let t = 2 * k + 1;
	let m = Math.pow(t, 2);
	t = t - 1;
	if (n >= m - t) {
		return { x: k - (m - n), y: -k };
	} else {
		m = m - t;
	}
	if (n >= m - t) {
		return { x: -k, y: -k + (m - n) };
	} else {
		m = m - t;
	}
	if (n >= m - t) {
		return { x: -k + (m - n), y: k };
	} else {
		return { x: k, y: k - (m - n - t) };
	}
}
