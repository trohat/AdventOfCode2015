console.log("AOC 2015 - Day 10: Elves Look, Elves Say");

const task = (sequence, times) => {
    for (let step = 0; step < times; step++) {
        let newSequence = "";
        for (let i = 0; i < sequence.length; i++) {
            let char = sequence[i];
            let repeats = 1;
            while (sequence[i+1] === char) {
                i++;
                repeats++;
            }
            newSequence += repeats + char;
        }
        sequence = newSequence;
    }
    return sequence.length;
};

let testdata = `1`;

console.log("");

doEqualTest(task(testdata, 5), 6);

console.time("Task 1");
console.log("Task 1: " + task(inputdata, 40));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, 50));
console.timeEnd("Task 2");