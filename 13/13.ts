// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		firewall = parseInput(data),
		severity = sendPacket(firewall);

	return severity;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		firewall = parseInput(data),
		delay = findOptimalTiming(firewall);

	return delay;
}

//Run
// solveB("example_b", "13");

// Functions
type Firewall = {
	depth: number;
	scanner: number;
	range: number;
	direction: string;
}[];

function parseInput(data: string) {
	const firewall: Firewall = [];

	for (let line of data.split("\r\n")) {
		const [depth, range] = (line.match(/\d+/g) || []).map(Number);

		firewall.push({
			depth,
			scanner: 0,
			range,
			direction: "D",
		});
	}

	return firewall;
}
function sendPacket(firewall: Firewall, partB: boolean = false) {
	const maxDepth = firewall[firewall.length - 1].depth;

	let severity = 0;

	for (let i = 0; i <= maxDepth; i++) {
		const wall = firewall.find((wall) => wall.depth === i);

		if (wall && wall.scanner === 0) {
			if (partB) return 1;
			severity += wall.range * wall.depth;
		}

		firewall = updateFirewall(firewall);
	}

	return severity;
}
function updateFirewall(firewall: Firewall): Firewall {
	return firewall.map((wall) => {
		const index = wall.scanner + (wall.direction === "D" ? 1 : -1);

		return {
			depth: wall.depth,
			scanner: index,
			range: wall.range,
			direction:
				index === 0 ? "D" : index === wall.range - 1 ? "U" : wall.direction,
		};
	});
}
function findOptimalTiming(firewall: Firewall) {
	for (let i = 0; true; i++) {
		const caught = sendPacket(firewall, true);
		firewall = updateFirewall(firewall);

		if (caught === 0) {
			return i;
		}
	}
}
