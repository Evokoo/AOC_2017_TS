// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		digits = parseInput(data);

	return sumPairs(digits);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		digits = parseInput(data);

	return sumPairs(digits, true);
}

//Run
solveB("example_b", "01");

// Functions
function parseInput(data: string): number[] {
	return [...data].map(Number);
}
function sumPairs(digits: number[], partB: boolean = false): number {
	const n = partB ? digits.length / 2 : 1;
	let sum = 0;

	for (let i = 0; i < digits.length; i++) {
		const a = digits[i];
		const b = digits[(i + n) % digits.length];

		if (a === b) {
			sum += a;
		}
	}

	return sum;
}
