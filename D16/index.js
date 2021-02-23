console.log("AOC 2015 - Day 16: Aunt Sue");

const splitLines = data => data.split(String.fromCharCode(10));

const preparePD = data => {
    const re = /(\w+): (\d)/;
    let tape = {};
    for (const line of data) {
        const [ , thing, count ] = re.exec(line);
        tape[thing] = +count;
    }
    return tape;
};

const prepare = data => {
    const re = /Sue (\d+): ([\w: ,]+)/;
    const tRe = /(\w+): (\d+)/;
    const sues = [];
    for (const line of data) {
        let [ , n, things ] = re.exec(line);
        things = things.split(", ").map(l => {
            let [ , thing, count ] = tRe.exec(l);
            return ({ thing, count: +count});
        });
        sues.push( {number: +n, things});
    }
    return sues;
};

const task1 = (sues, gift) => {
    for (const sue of sues) {
        let theOne = true;
        for (const thing of sue.things) {
            if (gift[thing.thing] !== thing.count) theOne = false;
        }
        if (theOne) return sue.number;
    }
};

const task2 = (sues, onGift) => {
    for (const sue of sues) {
        let theOne = true;
        for (const thing of sue.things) {
            switch (thing.thing) {
                case "cats":
                case "trees":
                    if (onGift[thing.thing] >= thing.count) theOne = false;
                    break;
                case "pomeranians":
                case "goldfish":
                    if (onGift[thing.thing] <= thing.count) theOne = false;
                    break;
                default:
                    if (onGift[thing.thing] !== thing.count) theOne = false;
            }
        }
        if (theOne) return sue.number;
    }
};

let primaryData = `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

primaryData = preparePD(splitLines(primaryData));

console.log(primaryData);

console.log("");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata, primaryData));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task2(inputdata, primaryData));
console.timeEnd("Task 2");