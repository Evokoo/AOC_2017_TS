import { register } from "module";

type Registers = { [key: string]: number };
type Instruction = { type: string; values: (string | number)[] };

export default class Program {
	private _registers: Registers;
	private _step: number = 1;
	private _index: number = 0;

	private calls: Record<string, number> = {
		set: 0,
		sub: 0,
		mul: 0,
		jnz: 0,
	};

	constructor(registerKeys: string[], debug: boolean = true) {
		this._registers = this.setRegisters(registerKeys);

		if (!debug) {
			this._registers["a"] = 1;
		}
	}

	private setRegisters = (keys: string[]): Registers => {
		return [...keys].reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {});
	};
	private set = (x: string, y: string | number) => {
		const value = typeof y === "number" ? y : this._registers[y];
		this._registers[x] = value;
	};
	private sub = (x: string, y: string | number) => {
		const value = typeof y === "number" ? y : this._registers[y];
		this._registers[x] -= value;
	};
	private mul = (x: string, y: string | number) => {
		const value = typeof y === "number" ? y : this._registers[y];
		this._registers[x] *= value;
	};
	private jnz = (x: string | number, y: string | number) => {
		const value = typeof x === "number" ? x : this._registers[x];

		if (value !== 0) {
			const size = typeof y === "number" ? y : this._registers[y];
			this._step = size;
		}
	};
	public execute = ({ type, values }: Instruction) => {
		this._step = 1;

		switch (type) {
			case "set":
				this.calls.set++;
				this.set(values[0] as string, values[1]);
				break;
			case "sub":
				this.calls.sub++;
				this.sub(values[0] as string, values[1]);
				break;
			case "mul":
				this.calls.mul++;
				this.mul(values[0] as string, values[1]);
				break;
			case "jnz":
				this.calls.jnz++;
				this.jnz(values[0], values[1]);
				break;
			default:
				throw Error("Invalid Instruction");
		}

		this._index += this._step;
	};

	public getCallCount = (type: string): number => {
		if (type && this.calls[type]) {
			return this.calls[type];
		} else {
			throw Error("No type given");
		}
	};

	public getRegister = (register: string): number => {
		if (register && this._registers[register]) {
			return this._registers[register];
		} else {
			throw Error("No register given");
		}
	};

	get registers(): Registers {
		return this._registers;
	}

	get index(): number {
		return this._index;
	}
}
