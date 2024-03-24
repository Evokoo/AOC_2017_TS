// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		steps = runInstructions(instructions);

	return steps;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		steps = runInstructions(instructions, true);

	console.log(steps);

	return steps;
}

//Run
solveB("example_b", "05");

// Functions
function parseInput(data: string): number[] {
	return data.split("\r\n").map(Number);
}
function runInstructions(
	instructions: number[],
	partB: boolean = false
): number {
	let steps = 0;

	for (let index = 0; true; ) {
		const instruction = instructions[index];

		steps++;

		if (instruction === 0) {
			instructions[index]++;
		} else {
			const nextIndex = index + instruction;

			if (nextIndex >= instructions.length || nextIndex < 0) {
				return steps;
			} else {
				instructions[index] += instruction >= 3 && partB ? -1 : 1;
				index = nextIndex;
			}
		}
	}
}
