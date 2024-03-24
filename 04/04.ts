// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		phrases = parseInput(data),
		validPhrases = phrases.filter((phrase) => validatePhrase(phrase));

	return validPhrases.length;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		phrases = parseInput(data),
		validPhrases = phrases.filter((phrase) => validatePhrase(phrase, true));

	return validPhrases.length;
}

//Run
solveB("example_b", "04");

// Functions
function parseInput(data: string) {
	const phrases: string[][] = [];

	for (let line of data.split("\r\n")) {
		phrases.push(line.split(" "));
	}

	return phrases;
}
function validatePhrase(phrase: string[], partB: boolean = false) {
	for (let i = 0; i < phrase.length; i++) {
		for (let j = i + 1; j < phrase.length; j++) {
			const phraseA = phrase[i];
			const phraseB = phrase[j];

			if (phraseA === phraseB) return false;

			if (partB && phraseA.length === phraseB.length) {
				const a = [...phraseA].sort().join("");
				const b = [...phraseB].sort().join("");

				if (a === b) return false;
			}
		}
	}

	return true;
}
