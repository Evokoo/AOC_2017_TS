// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		blueprints = parseInput(data),
		checksum = getChecksum(blueprints);

	return checksum;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "25");

// Functions
type Conditions = { startState: string; steps: number };
type State = {
	[key: number]: {
		write: number;
		increment: number;
		moveTo: string;
	};
};
type Blueprint = {
	states: Map<string, State>;
	conditions: Conditions;
};

function parseInput(data: string) {
	const sections = data.split(/\r\n\s*\r\n/);
	const conditions = { startState: "", steps: 0 };
	const states: Map<string, State> = new Map();

	for (let line of sections.shift()!.split("\r\n")) {
		if (line.startsWith("Begin")) {
			const state = line.split(" ").at(-1) ?? "A";
			conditions.startState = state[0];
		} else {
			const steps = line.match(/\d+/) || [];
			conditions.steps = +steps;
		}
	}

	for (let section of sections) {
		let stateID: string = "";
		let state: State = {
			0: { write: 0, increment: 0, moveTo: "" },
			1: { write: 0, increment: 0, moveTo: "" },
		};

		const lines = section.split("\r\n");

		for (let i = 0; i < lines.length; i++) {
			const details = lines[i].trim().split(" ");
			const key = i < 6 ? 0 : 1;

			switch (i) {
				case 0:
					stateID = details[2][0];
					break;
				case 2:
				case 6:
					state[key].write = +details[4][0];
					break;
				case 3:
				case 7:
					state[key].increment = details[6] === "right." ? 1 : -1;
					break;
				case 4:
				case 8:
					state[key].moveTo = details[4][0];
					break;
			}
		}
		states.set(stateID, state);
	}

	return { states, conditions };
}
function getChecksum({ states, conditions }: Blueprint) {
	const tape: Map<number, number> = new Map();

	let pointer = 0;
	let currentState = conditions.startState;
	let checksum = 0;

	for (let step = 0; step < conditions.steps; step++) {
		const value = tape.get(pointer) ?? 0;
		const { write, increment, moveTo } = states.get(currentState)![value];

		if (value === 0 && write === 1) {
			checksum++;
		} else if (value === 1 && write === 0) {
			checksum--;
		}

		tape.set(pointer, write);
		pointer += increment;
		currentState = moveTo;
	}

	return checksum;
}
