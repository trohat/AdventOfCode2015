console.log("AOC 2015 - Day 6: Probably a Fire Hazard");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;
    instructions = [];
    for (const line of data) {
        let [, op, x1, y1, x2, y2] = re.exec(line);
        if (op.includes("turn")) op = op.slice(5);
        instructions.push({ op, x1: +x1, y1: +y1, x2: +x2, y2: +y2 });
    }
    return instructions;
};

const task1 = instructions => {
    const lights = [];
    for (let i = 0; i < 1000; i++) {
        lights.push([]);
        for (let j = 0; j < 1000; j++) {
            lights[i].push(false);
        }
    }
    for (const inst of instructions) {
        for (let i = inst.y1; i <= inst.y2; i++) {
            for (let j = inst.x1; j <= inst.x2; j++) {
                switch (inst.op) {
                    case "on":
                        lights[i][j] = true;
                        break;
                    case "off":
                        lights[i][j] = false;
                        break;
                    case "toggle":
                        lights[i][j] = !lights[i][j];
                        break;
                    default:
                        console.error("Unknown op.");
                }
            }
        }
    }
    return lights.reduce((acc, line) => acc + line.filter(l => l).length, 0);
};

const task2 = instructions => {
    const lights = [];
    for (let i = 0; i < 1000; i++) {
        lights.push([]);
        for (let j = 0; j < 1000; j++) {
            lights[i].push(0);
        }
    }
    for (const inst of instructions) {
        for (let i = inst.y1; i <= inst.y2; i++) {
            for (let j = inst.x1; j <= inst.x2; j++) {
                switch (inst.op) {
                    case "on":
                        lights[i][j]++;
                        break;
                    case "off":
                        if (lights[i][j] > 0) lights[i][j]--;
                        break;
                    case "toggle":
                        lights[i][j] += 2;
                        break;
                    default:
                        console.error("Unknown op.");
                }
            }
        }
    }
    return lights.reduce((acc, line) => acc + line.sum(), 0);
};

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

console.log("");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");