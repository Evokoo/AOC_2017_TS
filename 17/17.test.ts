import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./17";

const currentDay = path.basename(__dirname);

describe(`AOC 2017 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(638);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(1173);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(1222153);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(1930815);
		});
	});
});
