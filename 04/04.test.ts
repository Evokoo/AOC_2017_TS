import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./04";

const currentDay = path.basename(__dirname);

describe(`AOC 2017 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(2);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(455);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(3);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(186);
		});
	});
});
