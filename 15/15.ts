// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		generators = parseInput(data),
		matches = runGenerators(generators);

	return matches;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		generators = parseInput(data),
		matches = runGenerators(generators, true);

	return matches;
}

//Run
// solveB("example_b", "15");

// Functions
type Generators = { [key: string]: number };

function parseInput(data: string) {
	const generators: Generators = {};

	for (let line of data.split("\r\n")) {
		const details = line.split(" ");
		const ID = details[1];
		const value = +details[4];

		generators[ID] = value;
	}

	return generators;
}
function runGenerators(generators: Generators, partB: boolean = false) {
	let iterations = partB ? 5_000_000 : 40_000_000;
	let matches = 0;

	for (let i = 0; i < iterations; i++) {
		if (!partB) {
			generators.A = (generators.A * 16807) % 0x7fffffff;
			generators.B = (generators.B * 48271) % 0x7fffffff;
		} else {
			do {
				generators.A = (generators.A * 16807) % 0x7fffffff;
			} while (generators.A % 4 !== 0);
			do {
				generators.B = (generators.B * 48271) % 0x7fffffff;
			} while (generators.B % 8 !== 0);
		}

		if ((generators.A & 0xffff) === (generators.B & 0xffff)) {
			matches++;
		}
	}

	return matches;
}
