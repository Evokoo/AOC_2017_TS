// Imports
import { s } from "vitest/dist/reporters-5f784f42";
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string, size: number): number {
	const data = TOOLS.readData(fileName, day),
		sequence = parseInput(data),
		hash = knotHash(sequence, size),
		product = hash[0] * hash[1];

	return product;
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		sequence = parseInput(data, true),
		sparseHash = knotHash(sequence, 256, true),
		hash = compressHash(sparseHash);

	return hash;
}

//Run
solveA("input", "10", 256);

// Functions
function parseInput(data: string, partB: boolean = false) {
	if (partB) {
		const suffix = [17, 31, 73, 47, 23];
		const bytes = (data.match(/./g) || []).map((char) => char.charCodeAt(0));
		return bytes.concat(suffix);
	}

	return (data.match(/\d+/g) || []).map(Number);
}
function knotHash(
	sequence: number[],
	size: number,
	partB: boolean = false
): number[] {
	let pointer = { list: 0, skip: 0 };
	let list = Array.from({ length: size }, (_, i) => i);

	for (let cycle = 0; cycle < (partB ? 64 : 1); cycle++) {
		for (let sectionSize of sequence) {
			list = reverseSection(list, pointer.list, sectionSize - 1);
			pointer.list = (pointer.list + sectionSize + pointer.skip) % list.length;
			pointer.skip++;
		}
	}

	return list;
}
function reverseSection(list: number[], index: number, size: number) {
	let start = index;
	let end = start + size;
	let len = list.length;

	while (start < end) {
		const a = start % len;
		const b = end % len;

		[list[a], list[b]] = [list[b], list[a]];
		start++;
		end--;
	}

	return list;
}
function compressHash(sparseHash: number[]) {
	let hash = "";

	for (let i = 0; i < sparseHash.length; i += 16) {
		const slice = sparseHash.slice(i, i + 16);
		const byte = slice.reduce((acc, cur) => acc ^ cur, 0);
		const hex = byte.toString(16).padStart(2, "0");

		hash += hex;
	}

	return hash;
}

// Export function used in day 14
export function getKnotHash(input: string) {
	const byteSequence = parseInput(input, true);
	const sparseHash = knotHash(byteSequence, 256, true);
	const hash = compressHash(sparseHash);

	return hash;
}
