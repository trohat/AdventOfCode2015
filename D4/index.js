console.log("AOC 2015 - Day 4: The Ideal Stocking Stuffer");

const task1 = key => {
    for (let i = 1;; i++) {
        let hash = MD5(key + i);
        if (hash.slice(0,5) === "00000") return i;
    }
}

const task2 = key => {
    for (let i = 1;; i++) {
        let hash = MD5(key + i);
        if (hash.slice(0,6) === "000000") return i;
    }
};

let testdata1 = `abcdef`;
let testdata2 = `pqrstuv`;

console.log("");

doEqualTest(task1(testdata1), 609043);
doEqualTest(task1(testdata2), 1048970);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");