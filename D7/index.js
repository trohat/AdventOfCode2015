console.log("AOC 2015 - Day 7: Some Assembly Required");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(?:(\w{1,2}|\d+) |)(?:(AND|OR|LSHIFT|RSHIFT|NOT) |)(\w{1,2}|\d+) -> (\w{1,2})/;
    const circuit = [];
    for (const line of data) {
        const [, first, op, second, output] = re.exec(line);
        circuit.push({ op, output, first, second });
    }
    return circuit;
};

String.prototype.isNumber = function () {
    return this == Number(this);
};

const task = (circuit, test, bInput) => {
    const wires = {};
    //const startInsts = circuit.filter(i => i.op === undefined);
    //circuit = circuit.filter(i => !startInsts.includes(i));
    //console.log(startInsts);
    //console.log(circuit);
    //for (const i in startInsts) {
    //    wires[i.output] = i.second;
    //}
    while (circuit.length > 0) {
        circuit = circuit.filter(i => {
            if ((i.first === undefined || i.first in wires || i.first.isNumber()) && (i.second in wires || i.second.isNumber())) {
                let first = i.first === undefined ? undefined : i.first.isNumber() ? +i.first : wires[i.first];
                let second = i.second.isNumber() ? +i.second : wires[i.second];
                switch (i.op) {
                    case undefined:
                        if (bInput !== undefined && i.output === "b") wires.b = bInput;
                        else wires[i.output] = second;
                        break;
                    case "AND":
                        wires[i.output] = first & second;
                        break;
                    case "OR":
                        wires[i.output] = first | second;
                        break;
                    case "NOT":
                        wires[i.output] = 65535 - second;
                        break;
                    case "LSHIFT":
                        wires[i.output] = first << second;
                        break;
                    case "RSHIFT":
                        wires[i.output] = first >> second;
                        break;
                    default:
                        console.error("Wrong op.");
                }
                return false;
            }
            return true;
        });
    }
    if (test === "test") return wires.i;
    return wires.a;
};

let testdata = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task(testdata, "test"), 65079);

let newB;

console.time("Task 1");
console.log("Task 1:", newB = task(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2:", task(inputdata, null, newB));
console.timeEnd("Task 2");