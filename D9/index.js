console.log("AOC 2015 - Day 9: All in a Single Night");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const distances = {};
    const re = /(\w+) to (\w+) = (\d+)/;
    for (const line of data) {
        const [ , from, to, distance ] = re.exec(line);
        if (!(from in distances)) distances[from] = {};
        distances[from][to] = +distance;
        if (!(to in distances)) distances[to] = {};
        distances[to][from] = +distance;
    }
    return distances;
};

// from AOC 2019 - Day 7: Amplification Circuit
const getAllPermutations = (arr) => {
    if (arr.length === 1) return [[...arr]];
    const permutations = [];
    arr.forEach((d, index) => {
        let newArr = [...arr];
        newArr.splice(index, 1);
        getAllPermutations(newArr).forEach((newD) => {
            permutations.push([d, ...newD]);
        });
    });
    return permutations;
};

const task1 = distances => {
    const places = Object.keys(distances);
    const permutations = getAllPermutations(places);
    let shortest = 10e10;
    for (const permutation of permutations) {
        let distance = 0;
        for (let i = 0; i < permutation.length - 1; i++) {
            distance += distances[permutation[i]][permutation[i+1]];
        }
        if (distance < shortest) shortest = distance;
    }
    return shortest;
};

const task2 = distances => {
    const places = Object.keys(distances);
    const permutations = getAllPermutations(places);
    let longest = 0;
    for (const permutation of permutations) {
        let distance = 0;
        for (let i = 0; i < permutation.length - 1; i++) {
            distance += distances[permutation[i]][permutation[i+1]];
        }
        if (distance > longest) longest = distance;
    }
    return longest;
};

let testdata = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 605);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 982);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");