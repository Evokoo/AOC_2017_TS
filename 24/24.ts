// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		components = parseInput(data),
		strongest = DFS(components);

	return strongest;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		components = parseInput(data),
		strongest = DFS(components, true);

	return strongest;
}

//Run
solveB("example_b", "24");

// Functions
type Bridge = {
	port: number;
	components: Set<string>;
	strength: number;
};
type Component = { code: string; ports: number[]; strength: number };

function parseInput(data: string) {
	const components: Component[] = [];

	for (let line of data.split("\r\n")) {
		const [a, b] = line.split("/").map(Number);

		components.push({ code: line, ports: [a, b], strength: a + b });
	}

	return components;
}
function DFS(components: Component[], partB: boolean = false) {
	const stack: Bridge[] = [{ port: 0, components: new Set(), strength: 0 }];

	let strongest: number = 0;
	let longest: number = 0;

	while (stack.length) {
		const current = stack.pop()!;
		const validComponents = components.filter((component) => {
			return (
				component.ports.includes(current.port) &&
				!current.components.has(component.code)
			);
		});

		if (validComponents.length) {
			for (let component of validComponents) {
				const availablePort =
					current.port === component.ports[0]
						? component.ports[1]
						: component.ports[0];

				stack.push({
					port: availablePort,
					components: new Set([...current.components, component.code]),
					strength: current.strength + component.strength,
				});
			}
		} else {
			if (partB) {
				const size = current.components.size;

				if (size === longest) {
					strongest = Math.max(strongest, current.strength);
				} else if (size > longest) {
					longest = size;
					strongest = current.strength;
				}
			} else {
				strongest = Math.max(strongest, current.strength);
			}
		}
	}

	return strongest;
}
