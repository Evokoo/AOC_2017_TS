// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		value = populateBuffer(+data);

	return value;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		value = populateBuffer(+data, true);

	return value;
}

//Run
solveB("example_b", "17");

// Functions
function populateBuffer(size: number, partB: boolean = false) {
	const buffer = [0];
	const max = partB ? 50_000_000 : 2017;

	let index = 0;
	let indexOne = 0;

	for (let i = 1; i <= max; i++) {
		const newIndex = ((index + size) % i) + 1;

		if (partB) {
			if (newIndex === 1) {
				indexOne = i;
			}
		} else {
			buffer.splice(newIndex, 0, i);
		}

		index = newIndex;
	}

	return partB ? indexOne : buffer[index + 1];
}
