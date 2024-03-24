// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		virus = simulateVirus(parseInput(data), 10000);

	return virus.infected;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		virus = simulateVirus(parseInput(data), 10000000, true);

	return virus.infected;
}

//Run
solveB("example_b", "22");

// Functions
type Point = { x: number; y: number };
type Virus = {
	pos: Point;
	bearing: number;
	infections: Map<string, string>;
	infected: number;
};

function parseInput(data: string): Virus {
	const grid = data.split("\r\n");
	const size = { width: grid[0].length, height: grid.length };
	const center = { x: (size.height - 1) / 2, y: (size.width - 1) / 2 };
	const infections: Map<string, string> = new Map();

	for (let y = 0; y < size.height; y++) {
		for (let x = 0; x < size.width; x++) {
			if (grid[y][x] === "#") {
				const [lx, ly] = [x - center.x, center.y - y];

				infections.set(JSON.stringify({ x: lx, y: ly }), "I");
			}
		}
	}

	return {
		pos: { x: 0, y: 0 },
		bearing: 0,
		infections,
		infected: 0,
	};
}
function simulateVirus(virus: Virus, cycles: number, partB: boolean = false) {
	for (let i = 0; i < cycles; i++) {
		const position = JSON.stringify(virus.pos);

		if (partB) {
			const status = virus.infections.get(position) ?? "C";

			switch (status) {
				case "C":
					virus.bearing = (virus.bearing - 90 + 360) % 360;
					virus.infections.set(position, "W");
					break;
				case "W":
					virus.infections.set(position, "I");
					virus.infected++;
					break;
				case "I":
					virus.bearing = (virus.bearing + 90) % 360;
					virus.infections.set(position, "F");
					break;
				case "F":
					virus.bearing = (virus.bearing + 180) % 360;
					virus.infections.set(position, "C");
					break;
				default:
					throw Error("Invalid status");
			}
		} else {
			if (virus.infections.has(position)) {
				virus.bearing = (virus.bearing + 90) % 360;
				virus.infections.delete(position);
			} else {
				virus.bearing = (virus.bearing - 90 + 360) % 360;
				virus.infections.set(position, "I");
				virus.infected++;
			}
		}

		switch (virus.bearing) {
			case 0:
				virus.pos.y++;
				break;
			case 90:
				virus.pos.x++;
				break;
			case 180:
				virus.pos.y--;
				break;
			case 270:
				virus.pos.x--;
				break;
			default:
				throw Error("Invalid bearing");
		}
	}

	return virus;
}
