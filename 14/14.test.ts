import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./14";

const currentDay = path.basename(__dirname);

describe(`AOC 2017 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(8108);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(8194);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(1242);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(1141);
		});
	});
});
