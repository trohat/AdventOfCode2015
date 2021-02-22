console.log("AOC 2015 - Day 13: Knights of the Dinner Table");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w+) would (lose|gain) (\d+) happiness units by sitting next to (\w+)./;
    const preferences = {};
    for (const line of data) {
        const [ , who, what, howMuch, where ] = re.exec(line);
        if (!(who in preferences)) preferences[who] = {};
        const amount = what === "gain" ? +howMuch : -howMuch;
        preferences[who][where] = amount;
    }
    return preferences;
};

const task = (preferences, task) => {
    const people = Object.keys(preferences);
    if (task === "task2") {
        people.push("me");
        preferences.me = {};
        for (const person of people) {
            preferences[person].me = 0;
            preferences.me[person] = 0;
        }
    }
    const permutations = getAllPermutations(people);
    let happiest = 0;
    for (const permutation of permutations) {
        permutation.push(permutation[0]);
        let actualHappiness = 0;
        for (let i = 0; i < permutation.length - 1; i++) {
            actualHappiness += preferences[permutation[i]][permutation[i+1]];
            actualHappiness += preferences[permutation[i+1]][permutation[i]];
        }    
        if (actualHappiness > happiest) happiest = actualHappiness;
    }
    return happiest;
};

let testdata = `Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task(testdata), 330);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");