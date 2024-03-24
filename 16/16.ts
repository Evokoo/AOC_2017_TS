// Imports
import TOOLS from "../00/tools";
import Dance from "./Dance";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		moves = parseInput(data),
		result = performDance(moves);

	return result;
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		moves = parseInput(data),
		result = performShow(moves);

	return result;
}

//Run
// solveB("input", "16");

// Functions
type Instruction = { type: string; variables: (string | number)[] };

function parseInput(data: string) {
	const instructions: Instruction[] = [];

	for (let line of data.split(",")) {
		const type = line.slice(0, 1);
		const details = line.slice(1).match(/[a-z0-9]+/g)!;

		switch (type) {
			case "s":
				instructions.push({ type: type, variables: [+details[0]] });
				break;
			case "x":
				instructions.push({
					type: type,
					variables: [+details[0], +details[1]],
				});
				break;
			case "p":
				instructions.push({
					type: type,
					variables: [details[0], details[1]],
				});
				break;
			default:
				throw Error("Invalid instruction");
		}
	}

	return instructions;
}
function performDance(moves: Instruction[]): string {
	const dance = new Dance(16);

	for (let move of moves) {
		switch (move.type) {
			case "s":
				dance.spin(move.variables[0] as number);
				break;
			case "x":
				dance.exchange(
					move.variables[0] as number,
					move.variables[1] as number
				);
				break;
			case "p":
				dance.partner(move.variables[0] as string, move.variables[1] as string);
				break;
			default:
				throw Error("Invalid move");
		}
	}

	return dance.result();
}
function performShow(moves: Instruction[]) {
	const dance = new Dance(performDance(moves));
	const formations: string[] = [];

	while (formations.length < 100) {
		for (let move of moves) {
			switch (move.type) {
				case "s":
					dance.spin(move.variables[0] as number);
					break;
				case "x":
					dance.exchange(
						move.variables[0] as number,
						move.variables[1] as number
					);
					break;
				case "p":
					dance.partner(
						move.variables[0] as string,
						move.variables[1] as string
					);
					break;
				default:
					throw Error("Invalid move");
			}
		}

		formations.push(dance.result());
	}
	return nthInteration(formations, 1000000000 - 1);
}
function nthInteration(array: string[], target: number) {
	let sequence = { index: 0, len: 0, pattern: [""] };

	for (let i = 0; i < array.length; i++) {
		const a = array[i];

		for (let j = 1; j < 50; j++) {
			const b = array[j + i];

			if (a === b && j > 2) {
				const sectionA = array.slice(i, i + j),
					sectionB = array.slice(i + j, i + j + j);
				if (sectionA.join("") === sectionB.join("")) {
					sequence = { index: i + 1, len: sectionA.length, pattern: sectionA };
					break;
				}
			}
		}

		if (sequence.index !== 0) break;
	}

	const P: number = sequence.index,
		L: number = sequence.len,
		nth = ((target - P) % L) + P - P;

	return sequence.pattern[nth];
}
