type Registers = { [key: string]: number };
type Instruction = { type: string; values: (string | number)[] };

export default class Program {
	private registers: Registers;
	private queue: number[] = [];

	private step: number = 1;
	private index: number = 0;
	private status: string = "run";

	public recover: boolean = false;
	public sentMsg: number = 0;

	constructor(registerKeys: string[], initValue?: number) {
		this.registers = this.setRegisters(registerKeys);

		if (initValue) {
			this.registers["p"] = initValue;
		}
	}

	private setRegisters = (keys: string[]): Registers => {
		return [...keys].reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {});
	};
	private send = (register: string, target?: Program) => {
		if (target) {
			const value = this.registers[register];
			this.sendMessage(value, target);
		} else {
			const value = this.registers[register];
			this.queue.push(value);
		}
	};
	private rcv = (x: string, target?: Program) => {
		if (target) {
			if (this.queue.length >= 1) {
				const value = this.acceptMessage(target);
				this.registers[x] = value;
				this.status = "run";
			} else {
				this.status = "wait";
			}
		} else {
			const value = this.registers[x];
			if (value !== 0) this.recover = true;
		}
	};
	private set = (x: string, y: string | number) => {
		const value = typeof y === "number" ? y : this.registers[y];
		this.registers[x] = value;
	};
	private add = (x: string, y: string | number) => {
		const value = typeof y === "number" ? y : this.registers[y];
		this.registers[x] += value;
	};
	private mul = (x: string, y: string | number) => {
		const value = typeof y === "number" ? y : this.registers[y];
		this.registers[x] *= value;
	};
	private mod = (x: string, y: string | number) => {
		const value = typeof y === "number" ? y : this.registers[y];
		this.registers[x] = this.registers[x] % value;
	};
	private jgz = (x: string | number, y: string | number) => {
		const value = typeof x === "number" ? x : this.registers[x];

		if (value > 0) {
			const size = typeof y === "number" ? y : this.registers[y];
			this.step = size;
		}
	};
	public execute = ({ type, values }: Instruction, target?: Program) => {
		this.step = 1;
		this.recover = false;

		switch (type) {
			case "snd":
				this.send(values[0] as string, target);
				break;
			case "rcv":
				this.rcv(values[0] as string, target);
				break;
			case "set":
				this.set(values[0] as string, values[1]);
				break;
			case "add":
				this.add(values[0] as string, values[1]);
				break;
			case "mul":
				this.mul(values[0] as string, values[1]);
				break;
			case "mod":
				this.mod(values[0] as string, values[1]);
				break;
			case "jgz":
				this.jgz(values[0], values[1]);
				break;
			default:
				throw Error("Invalid Instruction");
		}

		if (this.status !== "wait") {
			this.index += this.step;
		}
	};
	private acceptMessage = (target: Program) => {
		target.sentMsg++;
		return this.queue.shift()!;
	};
	private sendMessage = (value: number, target: Program) => {
		target.queue.push(value);
	};
	public getRegister = (register?: string) => {
		if (register) {
			return this.registers[register];
		} else {
			return this.registers;
		}
	};
	public recoverMsg = (): number => {
		return this.queue[this.queue.length - 1];
	};
	get currentIndex(): number {
		return this.index;
	}
	get currentStatus(): string {
		return this.status;
	}
	get sentCount(): number {
		return this.sentMsg;
	}
}
