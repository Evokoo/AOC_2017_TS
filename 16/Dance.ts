export default class Dance {
	public line: string[];
	private lineLength: number;
	private readonly characters: string = "abcdefghijklmnopqrstuvwxyz";

	constructor(input: string | number) {
		if (typeof input === "string") {
			this.line = [...input];
			this.lineLength = input.length;
		} else if (typeof input === "number") {
			this.line = [...this.characters.slice(0, input)];
			this.lineLength = input;
		} else {
			throw Error("Invalid input");
		}
	}

	private swap = (a: number, b: number) => {
		[this.line[a], this.line[b]] = [this.line[b], this.line[a]];
	};

	public spin = (amount: number) => {
		const iterations = amount % this.lineLength;

		for (let i = 0; i < iterations; i++) {
			this.line = [this.line.pop()!, ...this.line];
		}
	};

	public exchange = (a: number, b: number) => {
		this.swap(a, b);
	};

	public partner = (a: string, b: string) => {
		const aIndex = this.line.indexOf(a);
		const bIndex = this.line.indexOf(b);

		this.swap(aIndex, bIndex);
	};

	public result = (): string => {
		return this.line.join("");
	};
}
