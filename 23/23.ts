// Imports
import TOOLS from "../00/tools";
import Program from "./Program";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		result = runProgram(instructions);

	return result.getCallCount("mul");
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		result = runProgram(instructions, false);

	// console.log(result);

	return 0;
}

//Run
solveB("input", "23");

// Functions
type Instruction = { type: string; values: (string | number)[] };

function parseInput(data: string) {
	const instructions: Instruction[] = [];

	for (let line of data.split("\r\n")) {
		const [type, a, b] = line.split(" ");

		switch (type) {
			case "set":
			case "sub":
			case "mul":
			case "jnz":
				instructions.push({
					type,
					values: [/\d+/.test(a) ? +a : a, /\d+/.test(b) ? +b : b],
				});
				break;
			default:
				throw Error("Invalid instruction");
		}
	}

	return instructions;
}
function runProgram(instructions: Instruction[], debug: boolean = true) {
	const program = new Program([..."abcdefgh"], debug);

	while (program.index >= 0 && program.index < instructions.length) {
		// for (let i = 0; i < 1000; i++) {
		const instruction = instructions[program.index];

		program.execute(instruction);
		// console.log(i, program.registers);
	}

	console.log(program);

	return program;
}
