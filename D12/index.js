console.log("AOC 2015 - JSAbacusFramework.io");

const task = (json, task) => {
    const count = thing => {
        if (typeof thing === "number") return thing;
        if (typeof thing === "string") return 0;
        if (Array.isArray(thing)) {
            let sum = 0;
            for (const item of thing) sum += count(item);
            return sum;
        }
        if (typeof thing === "object") {
            let sum = 0;
            if (task === "task2" && Object.values(thing).includes("red")) return 0;
            for (const item of Object.values(thing)) sum += count(item);
            return sum;
        }
        console.error("Unknown type.");
    }

    json = JSON.parse(json);
    
    return count(json);
};

let testdata = `[1,2,3]`;
let testdata2 = `{"d":"red","e":[1,2,3,4],"f":5}`;

console.log("");

doEqualTest(task(testdata), 6);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task(testdata2, "task2"), 0);

console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");