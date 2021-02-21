console.log("AOC 2015 - Day 2: I Was Told There Would Be No Math");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(l => l.split("x").map(Number));

const task1 = dimensions => {
    let wrappingPaper = 0;
    for (const prism of dimensions) {
        let a = [];
        a.push(prism[0] * prism[1]);
        a.push(prism[0] * prism[2]);
        a.push(prism[1] * prism[2]);
        wrappingPaper += 2*a.sum() + a.min();
    }
    return wrappingPaper;
};

const task2 = dimensions => {
    let ribbon = 0;
    for (const prism of dimensions) {
        prism.sort((a,b) => a-b);
        ribbon += 2*prism[0] + 2*prism[1] + prism[0] * prism[1] * prism[2];
    }
    return ribbon;
};

let testdata = `2x3x4
1x1x10`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 101);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 48);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");