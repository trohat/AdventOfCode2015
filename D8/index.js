console.log("AOC 2015 - Day 8: Matchsticks");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    for (const line of data) {
        console.log(line.length);
    }
};

const task1 = strings => {
    totalCode = 0;
    totalValue = 0;
    for (const st of strings) {
        totalCode += st.length;
        totalValue += eval(st).length;
    }
    return totalCode - totalValue;
};

const task2 = strings => {
    totalEscapes = 0;
    for (const st of strings) {
        totalEscapes += 2;
        for (const char of st) {
            if (char === '"') totalEscapes++;
            if (char === '\\') totalEscapes++;
        }
    }
    return totalEscapes;
}

let testdata = String.raw`""
"abc"
"aaa\"aaa"
"\x27"`;

inputdata = splitLines(inputdata);

console.log(inputdata);

testdata = splitLines(testdata);

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 12);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 19);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");