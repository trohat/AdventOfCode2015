console.log("AOC 2015 - Day 23: Opening the Turing Lock");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w{3}) ([-+\w]+),? ?([-+\w]+)?/;
    let instructions = [];
    for (const line of data) {
        const [, op, first, second] = re.exec(line);
        instructions.push({ op, first, second: +second });
    }
    return instructions;
};

const task = (instructions, test, task) => {
    let registers = { a: 0, b: 0 };
    if (task === "task2") registers.a = 1;

    let steps = 0;
    for (let i = 0; i < instructions.length; i++) {
        steps++;
        let inst = instructions[i];
        switch (inst.op) {
            case "hlf":
                registers[inst.first] /= 2;
                break;
            case "tpl":
                registers[inst.first] *= 3;
                break;
            case "inc":
                registers[inst.first]++;
                break;
            case "jmp":
                i += inst.first - 1;
                break;
            case "jie":
                if (registers[inst.first] % 2 === 0) i += inst.second - 1;
                break;
            case "jio":
                if (registers[inst.first] === 1) i += inst.second - 1;
                break;
            default:
                console.error("Wrong instruction.");
        }
        //console.log("Looking at", i, " a:", registers.a, " b:", registers.b);
    }
    if (test === "test") return registers.a;
    return registers.b;
};

let testdata = `inc a
jio a, +2
tpl a
inc a`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task(testdata, "test"), 2);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, null, "task2"));
console.timeEnd("Task 2");