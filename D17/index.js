console.log("AOC 2015 - Day 17: No Such Thing as Too Much");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(Number);

const task1 = (containers, target) => {
    const countCombinations = (arr, currentSum, target) => {
        if (currentSum > target) return 0;
        if (currentSum === target) return 1;
        let combinations = 0;
        arr.forEach((c, index) => {
            let newArr = [...arr];
            newArr.splice(0, index + 1);
            combinations += countCombinations(newArr, currentSum + c, target);
        });
        return combinations;
    };

    containers.sort((a, b) => b - a);
    return countCombinations(containers, 0, target)
};

const task2 = (containers, target) => {
    const findCombinations = (arr, currentSum, target, howDeep) => {
        if (currentSum > target) return;
        if (currentSum === target) {
            if (!(howDeep in depths)) depths[howDeep] = 1;
            else depths[howDeep]++;
            return;
        }
        arr.forEach((c, index) => {
            let newArr = [...arr];
            newArr.splice(0, index + 1);
            findCombinations(newArr, currentSum + c, target, howDeep + 1);
        });
        return;
    };

    const depths = [];
    containers.sort((a, b) => b - a);
    findCombinations(containers, 0, target, 0)
    for (const depth of depths) {
        if (depth !== undefined)
        return depth;
    }
};

let testdata = `20
15
10
5
5`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata, 25), 4);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata, 150));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata, 25), 3);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata, 150));
console.timeEnd("Task 2");