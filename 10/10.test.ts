import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./10";

const currentDay = path.basename(__dirname);

describe(`AOC 2017 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, 5)).toBe(12);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, 256)).toBe(15990);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(
				"33efeb34ea91902bb2f59c9920caa6cd"
			);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(
				"90adb097dd55dea8305c900372258ac6"
			);
		});
	});
});
