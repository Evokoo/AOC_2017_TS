// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ instuctions, registers } = parseInput(data),
		result = runInstructions(instuctions, registers);

	return result;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ instuctions, registers } = parseInput(data),
		result = runInstructions(instuctions, registers, true);

	return result;
}

//Run
solveB("example_b", "08");

// Functions
type Registers = Map<string, number>;
type Condition = { register: string; operator: string; amount: number };
type Instruction = {
	register: string;
	type: string;
	increment: number;
	condition: Condition;
};

function parseInput(data: string) {
	const registers: Registers = new Map();
	const instuctions: Instruction[] = [];

	for (let line of data.split("\r\n")) {
		const details = line.match(/\S+/g)!;

		if (!registers.has(details[0])) {
			registers.set(details[0], 0);
		}

		instuctions.push({
			register: details[0],
			type: details[1],
			increment: +details[2],
			condition: {
				register: details[4],
				operator: details[5],
				amount: +details[6],
			},
		});
	}

	return { instuctions, registers };
}
function isValidCondition(
	{ register, operator, amount }: Condition,
	registers: Registers
): boolean {
	const registerValue = registers.get(register) ?? 0;

	switch (operator) {
		case ">":
			return registerValue > amount;
		case "<":
			return registerValue < amount;
		case ">=":
			return registerValue >= amount;
		case "<=":
			return registerValue <= amount;
		case "!=":
			return registerValue !== amount;
		case "==":
			return registerValue === amount;
		default:
			throw Error("Invalid Operator");
	}
}
function updateRegisters(
	{ register, type, increment }: Instruction,
	registers: Registers
): Registers {
	const currentRegisterValue = registers.get(register) ?? 0;

	switch (type) {
		case "inc":
			registers.set(register, currentRegisterValue + increment);
			break;
		case "dec":
			registers.set(register, currentRegisterValue - increment);
			break;
		default:
			throw Error("Invalid instruction type");
	}

	return registers;
}
function getLargestRegister(registers: Registers): number {
	let max = 0;

	for (let [key, value] of registers.entries()) {
		max = Math.max(max, value);
	}

	return max;
}
function runInstructions(
	instuctions: Instruction[],
	registers: Registers,
	partB: boolean = false
) {
	let registerMax = 0;

	for (let instuction of instuctions) {
		if (isValidCondition(instuction.condition, registers)) {
			registers = updateRegisters(instuction, registers);

			if (partB)
				registerMax = Math.max(registerMax, getLargestRegister(registers));
		} else {
			continue;
		}
	}

	return partB ? registerMax : getLargestRegister(registers);
}
