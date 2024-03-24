// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		patterns = parseInput(data);

	makeArt(patterns);
	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "21");

// Functions
type Pattern = { size: number; variations: Set<string>; output: string };

function parseInput(data: string) {
	const patterns: Pattern[] = [];

	for (let pattern of data.split("\r\n")) {
		const [input, output] = pattern.split(" => ");

		patterns.push({
			size: input.split("/")[0].length,
			variations: getVariations(input),
			output,
		});
	}

	return patterns;
}
function rotateMatrix(matrix: String[][]): string[][] {
	const len = matrix.length;
	const rotatedMatrix = Array.from({ length: len }, (_) => Array(len).fill(""));

	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len; j++) {
			rotatedMatrix[j][len - 1 - i] = matrix[i][j];
		}
	}

	return rotatedMatrix;
}
function getVariations(pattern: string) {
	const variations: Set<string> = new Set();

	const rows = pattern.split("/");
	const regular = rows.map((row) => [...row]);
	const mirror = rows.map((row) => [...row].reverse());

	for (let variation of [regular, mirror]) {
		for (let i = 0; i <= 4; i++) {
			variation = rotateMatrix(variation);
			variations.add(variation.map((row) => row.join("")).join("/"));
		}
	}

	return variations;
}
function updateDesign(input: string[], sectionSize: number = 2) {
	//TO DO!

	const grid = input[0].split("/").map((row) => row.split(""));
	const dividedGrid = [];

	for (let i = 0; i < grid.length; i += sectionSize) {
		const rowSections = [];
		for (let j = 0; j < grid[i].length; j += sectionSize) {
			const section = [];
			for (let x = i; x < i + sectionSize; x++) {
				section.push(grid[x].slice(j, j + sectionSize).join(""));
			}
			rowSections.push(section.join("/"));
		}
		dividedGrid.push(rowSections);
	}

	console.log(dividedGrid);
}

function makeArt(patterns: Pattern[]) {
	let design = [".#./..#/###"];

	for (let i = 0; i < 1; i++) {
		for (let pattern of patterns) {
			design = design.map((section) => {
				if (pattern.variations.has(section)) {
					return pattern.output;
				} else {
					return section;
				}
			});
		}

		updateDesign(design);
	}
}
