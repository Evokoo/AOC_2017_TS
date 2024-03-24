// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		programs = parseInput(data),
		tree = buildTree(programs);

	return tree.keys().next().value;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		programs = parseInput(data),
		tree = buildTree(programs),
		weight = traverseTree(tree, tree.keys().next().value);

	return weight;
}

//Run
solveB("input", "07");

// Functions
type Program = { name: string; weight: number; paths: string[] };
type Branch = { weight: number; paths: Map<string, Branch> };

function parseInput(data: string): Program[] {
	const programs = data.split("\r\n").sort((a, b) => {
		const hasArrowA = a.includes("->");
		const hasArrowB = b.includes("->");
		return hasArrowA && !hasArrowB ? 1 : !hasArrowA && hasArrowB ? -1 : 0;
	});

	return programs.map((program) => {
		const details = program.match(/[a-z0-9]+/g) || [];

		return {
			name: details[0],
			weight: +details[1],
			paths: details.slice(2),
		} as Program;
	});
}
function buildTree(programs: Program[]) {
	const tree = new Map();
	const queue: Program[] = [...programs];

	while (queue.length) {
		const current = queue.shift()!;

		if (!current.paths.length) {
			tree.set(current.name, { weight: current.weight });
		} else {
			if (current.paths.every((program) => tree.has(program))) {
				tree.set(current.name, {
					weight: current.weight,
					paths: new Map(),
				});

				for (let program of current.paths) {
					const parent = tree.get(current.name);
					parent.paths.set(program, tree.get(program));

					tree.set(current.name, parent);
					tree.delete(program);
				}
			} else {
				queue.push(current);
				continue;
			}
		}
	}

	return tree;
}
function traverseTree(tree: Map<string, any>, base: string, diff: number = 0) {
	const trunk = tree.get(base);
	const branchWeights: Map<number, string[]> = new Map();

	for (let branch of trunk.paths) {
		const branchName = branch[0];
		const weight = getWeight(trunk.paths.get(branchName));

		if (branchWeights.has(weight)) {
			branchWeights.set(weight, [
				...(branchWeights.get(weight) || []),
				branchName,
			]);
		} else {
			branchWeights.set(weight, [branchName]);
		}
	}

	if (diff === 0) {
		for (let key of branchWeights.keys()) {
			if (diff === 0) diff = key;
			else if (diff !== key) {
				diff = Math.abs(diff - key);
				break;
			}
		}
	}

	if (branchWeights.size === 1) {
		return trunk.weight - diff;
	} else {
		for (let value of branchWeights.values()) {
			if (value.length === 1) {
				return traverseTree(trunk.paths, value[0], diff);
			}
		}
	}

	throw Error("Weight not found");
}
function getWeight(branch: Branch) {
	const queue: Branch[] = [branch];
	let weight = 0;

	while (queue.length) {
		const current = queue.shift()!;

		weight += current.weight;

		if (current.paths) {
			current.paths.forEach((subBranch) => {
				queue.push(subBranch);
			});
		} else {
			continue;
		}
	}
	return weight;
}
