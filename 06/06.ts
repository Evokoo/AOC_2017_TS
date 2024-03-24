// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		banks = parseInput(data),
		cycles = allocateMemory(banks);

	return cycles;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		banks = parseInput(data),
		cycles = allocateMemory(banks, true);

	return cycles;
}

//Run
solveB("example_b", "06");

// Functions
function parseInput(data: string): number[] {
	return (data.match(/\d+/g) || []).map(Number);
}
function getCurrentState(banks: number[]): string {
	return JSON.stringify(banks);
}
function getMaxMemory(banks: number[]): Record<string, number> {
	const max = { index: 0, value: 0 };

	for (let i = 0; i < banks.length; i++) {
		const bank = banks[i];

		if (bank > max.value) {
			max.index = i;
			max.value = bank;
		}
	}

	return max;
}
function allocateMemory(banks: number[], partB: boolean = false) {
	const states: Set<string> = new Set([getCurrentState(banks)]);
	const totalBanks = banks.length;

	let targetState = "";
	let loopStart = 0;

	for (let cycle = 0; true; ) {
		cycle++;

		const max = getMaxMemory(banks);
		const increment = Math.ceil(max.value / banks.length);
		const steps =
			max.value % totalBanks === 0 ? max.value : max.value % totalBanks;

		let available = max.value;

		for (let i = 0; i <= steps; i++) {
			const targetIndex = (i + max.index + 1) % banks.length;
			banks[targetIndex] += available >= increment ? increment : available;
			available -= increment;
		}

		banks[max.index] -= max.value;

		const currentState = getCurrentState(banks);

		if (currentState === targetState) {
			return cycle - loopStart;
		}

		if (states.has(currentState)) {
			if (partB && !targetState) {
				loopStart = cycle;
				targetState = currentState;
			}
			if (!partB) {
				return cycle;
			}
		} else {
			states.add(currentState);
		}
	}
}
