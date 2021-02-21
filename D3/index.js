console.log("AOC 2015 - Day 3: Perfectly Spherical Houses in a Vacuum");

const task1 = radioDirections => {
    const houses = new Set;
    let x = 0;
    let y = 0;
    houses.add([x,y].toString());
    for (let direction of radioDirections) {
        x += graphicsToDirs.get(direction).x;
        y += graphicsToDirs.get(direction).y;
        houses.add([x,y].toString());
    }
    return houses.size;
};

const task2 = radioDirections => {
    const houses = new Set;
    let santaX = 0;
    let santaY = 0;
    let roboSantaX = 0;
    let roboSantaY = 0;
    houses.add([santaX,santaY].toString());
    let santa = true;
    for (let direction of radioDirections) {
        if (santa) {
            santaX += graphicsToDirs.get(direction).x;
            santaY += graphicsToDirs.get(direction).y;
            houses.add([santaX,santaY].toString());
        } else {
            roboSantaX += graphicsToDirs.get(direction).x;
            roboSantaY += graphicsToDirs.get(direction).y;
            houses.add([roboSantaX,roboSantaY].toString());
        }
        santa = !santa;
    }
    return houses.size;
};

let testdata = `^>v<`;

console.log("");

doEqualTest(task1(testdata), 4);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 3);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");