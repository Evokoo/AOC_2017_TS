// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		{ grid, start } = parseInput(data),
		packet = followPath(grid, start);

	console.log(packet);

	return packet.letters.join("");
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ grid, start } = parseInput(data),
		packet = followPath(grid, start);

	console.log(packet);

	return packet.steps;
}

//Run
solveB("input", "19");

// Functions
type Point = { x: number; y: number };
type Packet = {
	pos: Point;
	direction: string;
	steps: number;
	letters: string[];
};

function parseInput(data: string) {
	const grid = data.split("\r\n");
	const startX = grid[0].indexOf("|");

	return { grid, start: { x: startX, y: 0 } };
}
function getPaths(pos: Point, max: Point): Point[] {
	const paths = [];

	for (let [nx, ny] of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	]) {
		const [x, y] = [nx + pos.x, ny + pos.y];

		if (x < 0 || x >= max.x || y < 0 || y >= max.y) {
			continue;
		} else {
			paths.push({ x, y });
		}
	}

	return paths;
}

function followPath(grid: string[], start: Point, partB: boolean = false) {
	const max = { x: grid[0].length, y: grid.length };
	const packet: Packet = { pos: start, direction: "S", steps: 0, letters: [] };
	const seen: Set<string> = new Set();

	while (true) {
		if (
			packet.pos.x < 0 ||
			packet.pos.x >= max.x ||
			packet.pos.y < 0 ||
			packet.pos.y >= max.y ||
			grid[packet.pos.y][packet.pos.x] === " "
		) {
			return packet;
		} else {
			packet.steps++;
		}

		seen.add(JSON.stringify(packet.pos));

		const tile = grid[packet.pos.y][packet.pos.x];

		if (/[A-Z]/.test(tile)) {
			packet.letters.push(tile);
		}

		if (tile === "+") {
			for (let { x, y } of getPaths(packet.pos, max)) {
				if (/[^\|\-\+A-Z]/.test(grid[y][x])) continue;
				if (seen.has(JSON.stringify({ x, y }))) continue;

				if (x === packet.pos.x + 1) {
					packet.pos.x++;
					packet.direction = "E";
				}

				if (x === packet.pos.x - 1) {
					packet.pos.x--;
					packet.direction = "W";
				}

				if (y === packet.pos.y + 1) {
					packet.pos.y++;
					packet.direction = "S";
				}

				if (y === packet.pos.y - 1) {
					packet.pos.y--;
					packet.direction = "N";
				}
			}
		} else {
			switch (packet.direction) {
				case "E":
					packet.pos.x++;
					break;
				case "W":
					packet.pos.x--;
					break;
				case "S":
					packet.pos.y++;
					break;
				case "N":
					packet.pos.y--;
					break;
			}
		}
	}
}
