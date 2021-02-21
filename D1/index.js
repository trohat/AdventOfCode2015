console.log("AOC 2015 - Day 1: Not Quite Lisp");

const task1 = data => {
    let level = 0;
    for (const char of data) {
        level += char === "(" ? 1 : -1;
    }
    return level;
};

const task2 = data => {
    let level = 0;
    for (let i = 0; i < data.length; i++) {
        level += data[i] === "(" ? 1 : -1;
        if (level < 0) return i + 1;      
    }
}

let testdata = `(()(()(`;

doEqualTest(task1(testdata), 3);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

testdata = `()())`;

doEqualTest(task2(testdata), 5);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");