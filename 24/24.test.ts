import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./24";

const currentDay = path.basename(__dirname);

describe(`AOC 2017 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(31);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(1868);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(19);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(1841);
		});
	});
});
