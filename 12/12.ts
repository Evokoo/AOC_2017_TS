// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		network = parseInput(data),
		connections = mapConnections(network, 0);

	return connections.size;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		network = parseInput(data),
		groups = groupPrograms(network);

	return groups.length;
}

//Run
solveB("example_b", "12");

// Functions
type Network = Map<number, Set<number>>;

function parseInput(data: string) {
	const network: Map<number, Set<number>> = new Map();

	for (let line of data.split("\r\n")) {
		const programs = (line.match(/\d+/g) || []).map(Number);
		const connections = network.get(programs[0]) || new Set();

		for (let program of programs.slice(1)) {
			connections.add(program);
		}

		network.set(programs[0], connections);
	}

	return network;
}
function mapConnections(network: Network, start: number) {
	const connections: Set<number> = new Set();
	const queue = [start];

	while (queue.length) {
		const key = queue.shift()!;

		for (let program of network.get(key)!) {
			if (connections.has(program)) {
				continue;
			} else {
				connections.add(program);
				queue.push(program);
			}
		}
	}

	return connections;
}
function groupPrograms(network: Network) {
	const groups = [];
	const usedPrograms: Set<number> = new Set();

	for (let i = 0; i < network.size; i++) {
		if (usedPrograms.has(i)) continue;

		const group = mapConnections(network, i);

		for (let program of [...group]) {
			usedPrograms.add(program);
		}

		groups.push(group);
	}

	return groups;
}
