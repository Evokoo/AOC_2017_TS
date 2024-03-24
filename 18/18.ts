// Imports
import TOOLS from "../00/tools";
import Program from "./Program";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ instructions, keys } = parseInput(data),
		result = runInstructions(instructions, new Program(keys));

	return result;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ instructions, keys } = parseInput(data),
		result = runPrograms(instructions, [
			new Program(keys, 0),
			new Program(keys, 1),
		]);

	return result;
}

//Run
solveB("example_b", "18");

// Functions
type Instruction = { type: string; values: (string | number)[] };
type Programs = Program[];

function parseInput(data: string) {
	const instructions: Instruction[] = [];
	const registers: Set<string> = new Set();

	for (let line of data.split("\r\n")) {
		const [type, a, b] = line.split(" ");

		if (/[a-z]/.test(a)) {
			registers.add(a);
		}

		switch (type) {
			case "set":
			case "add":
			case "mul":
			case "mod":
			case "jgz":
				instructions.push({
					type,
					values: [/\d+/.test(a) ? +a : a, /\d+/.test(b) ? +b : b],
				});
				break;
			case "snd":
			case "rcv":
				instructions.push({ type, values: [a] });
				break;
			default:
				throw Error("Invalid instruction");
		}
	}

	return { instructions, keys: [...registers] };
}
function runInstructions(instructions: Instruction[], program: Program) {
	while (true) {
		const index = program.currentIndex;

		program.execute(instructions[index]);

		if (program.recover === true) {
			return program.recoverMsg();
		}
	}
}
function runPrograms(instructions: Instruction[], programs: Programs) {
	while (true) {
		for (let i = 0; i <= 1; i++) {
			const A = programs[i];
			const B = programs[i === 0 ? 1 : 0];

			const index = A.currentIndex;
			A.execute(instructions[index], B);
		}

		if (programs.every((program) => program.currentStatus === "wait")) {
			break;
		}
	}

	return programs[1].sentCount;
}
