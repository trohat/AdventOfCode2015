console.log("AOC 2015 - Day 25: Let It Snow");

const prepare = line => {
    const re = /To continue, please consult the code grid in the manual.  Enter the code at (\w+) (\d+), (\w+) (\d+)./;
    const [ , k1, v1, k2, v2 ] = re.exec(line);
    const obj = {};
    obj[k2] = +v2;
    obj[k1] = +v1;
    return obj;
};

const task1 = obj => {
    
    let n = 1;
    let i;
    for (i = 2; i <= obj.column; i++) {
        n += i;
    }
    i--;
    for (let j = 2; j <= obj.row; j++, i++) {
        n += i;
    }
    
    let number = 20151125;
    for (let j = 2; j <= n; j++) {
        number *= 252533;
        number %= 33554393;
    }
    return number;
};

let testdata = `To continue, please consult the code grid in the manual.  Enter the code at row 4, column 3.`;

inputdata = prepare(inputdata);

console.log(inputdata);

testdata = prepare(testdata);

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 21345942);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");