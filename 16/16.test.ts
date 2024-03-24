import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./16";

const currentDay = path.basename(__dirname);

describe(`AOC 2017 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe("paedcbfghijklmno");
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe("lgpkniodmjacfbeh");
		});
	});

	describe("Part B", () => {
		// test("Example", () => {
		// 	expect(solveB("example_b", currentDay)).toBe(null);
		// });

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe("hklecbpnjigoafmd");
		});
	});
});
