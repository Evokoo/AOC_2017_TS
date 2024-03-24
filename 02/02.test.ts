import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./02";

const currentDay = path.basename(__dirname);

describe(`AOC 2017 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(18);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(36174);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(9);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(244);
		});
	});
});
