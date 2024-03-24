// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		table = parseInput(data);

	return getChecksum(table);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		table = parseInput(data);

	return getChecksum(table, true);
}

//Run
solveB("example_b", "02");

// Functions
function parseInput(data: string): number[][] {
	const table = [];

	for (let row of data.split("\r\n")) {
		const columns = row.match(/\d+/g)!.map(Number);
		table.push(columns);
	}

	return table;
}
function getDifference(row: number[]): number {
	return Math.max(...row) - Math.min(...row);
}
function getDivisible(row: number[]): number {
	for (let i = 0; i < row.length; i++) {
		for (let j = i + 1; j < row.length; j++) {
			const a = row[i];
			const b = row[j];

			if (a % b === 0) return a / b;
			if (b % a === 0) return b / a;
		}
	}

	throw Error("No divisble pair found");
}
function getChecksum(table: number[][], partB: boolean = false) {
	return table.reduce(
		(sum, row) => sum + (partB ? getDivisible(row) : getDifference(row)),
		0
	);
}
