// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		particles = parseInput(data),
		closestParticle = runSimulation(particles);

	return closestParticle;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		particles = parseInput(data),
		remainingParicles = runSimulation(particles, true);

	return remainingParicles;
}

//Run
solveB("input", "20");

// Functions
type XYZ = { x: number; y: number; z: number };
type Particle = { ID: number; p: XYZ; v: XYZ; a: XYZ; distance: number };

function getDistance(a: XYZ, b: XYZ = { x: 0, y: 0, z: 0 }): number {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}
function updateParticle({ ID, p, v, a }: Particle): Particle {
	v.x += a.x;
	v.y += a.y;
	v.z += a.z;
	p.x += v.x;
	p.y += v.y;
	p.z += v.z;

	return { ID, p, v, a, distance: getDistance(p) };
}
function parseInput(data: string) {
	const particles: Particle[] = [];
	const lines = data.split("\r\n");

	for (let i = 0; i < lines.length; i++) {
		const values = (lines[i].match(/-*\d+/g) || []).map(Number);

		particles.push({
			ID: i,
			p: { x: values[0], y: values[1], z: values[2] },
			v: { x: values[3], y: values[4], z: values[5] },
			a: { x: values[6], y: values[7], z: values[8] },
			distance: getDistance({ x: values[6], y: values[7], z: values[8] }),
		});
	}

	return particles;
}
function runSimulation(particles: Particle[], partB: boolean = false) {
	const collisions: Set<number> = new Set();

	for (let i = 0; i < 1000; i++) {
		particles = particles.map((particle) => {
			return updateParticle(particle);
		});

		if (partB) {
			for (let a = 0; a < particles.length; a++) {
				const particleA = particles[a];

				for (let b = a + 1; b < particles.length; b++) {
					const particleB = particles[b];

					if (
						particleA.p.x === particleB.p.x &&
						particleA.p.y === particleB.p.y &&
						particleA.p.z === particleB.p.z
					) {
						collisions.add(particleA.ID);
						collisions.add(particleB.ID);
					}
				}
			}

			particles = particles.filter((particle) => !collisions.has(particle.ID));
		}
	}

	if (partB) {
		return particles.length;
	} else {
		particles.sort((a, b) => a.distance - b.distance);
		return particles[0].ID;
	}
}
