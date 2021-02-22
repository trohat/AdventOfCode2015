console.log("AOC 2015 - Day 15: Science for Hungry People");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;
    const ingredients = [];
    for (const line of data) {
        const [ , name, capacity, durability, flavor, texture, calories ] = re.exec(line);
        ingredients.push({ name, capacity: +capacity, durability: +durability, flavor: +flavor, texture: +texture, calories: +calories });
    }
    return ingredients;
};

const task = (ingredients, task) => {
    const properties = [ "capacity", "durability", "flavor", "texture"];
    let bestCake = 0;
    for (let i = 0; i <= 100; i++) {
        for (let j = 0; j <= 100 - i; j++) {
            for (let k = 0; k <= 100 - i - j; k++) {
                const m = 100 - i - j - k;
                if (task === "task2") {
                    let property = "calories";
                    let calories = i * ingredients[0][property] + j * ingredients[1][property] + k * ingredients[2][property] + m * ingredients[3][property];
                    if (calories !== 500) continue;
                }
                let score = 1;
                for (const property of properties) {
                    let result = i * ingredients[0][property] + j * ingredients[1][property] + k * ingredients[2][property] + m * ingredients[3][property];
                    score *= result;
                    if (score <= 0) break;
                }
                if (score > bestCake) bestCake = score;
            }
        }
    }
    return bestCake;
};

let testdata = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");