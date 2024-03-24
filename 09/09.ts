// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		str = processString(data),
		score = scoreString(str);

	return score;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		str = processString(data, true),
		garbageCount = countGarbage(str);

	return garbageCount;
}

//Run
solveB("input", "09");

// Functions
function processString(data: string, partB: boolean = false): string {
	const stage1 = data.replace(/!./g, "");
	const stage2 = stage1.replace(/<.*?>/g, "");

	return partB ? stage1 : stage2;
}
function scoreString(str: string) {
	let depth = 0;
	let score = 0;

	for (let char of str) {
		if (char === "{") {
			depth++;
		}

		if (char === "}") {
			score += depth;
			depth--;
		}
	}

	return score;
}
function countGarbage(str: string) {
	let count = 0;
	let open = false;

	for (let char of str) {
		if (char === "<") {
			if (open) count++;
			else open = true;
			continue;
		}

		if (char === ">") {
			open = false;
			continue;
		}

		if (open) {
			count++;
		}
	}

	return count;
}
