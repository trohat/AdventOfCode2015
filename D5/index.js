console.log("AOC 2015 - Day 5: Doesn't He Have Intern-Elves For This?");

const splitLines = data => data.split(String.fromCharCode(10));

const task1 = strings => {
    const vowels = ["a", "e", "i", "o", "u"];
    const forbidden = [ "ab", "cd", "pq", "xy"];
    let niceStrings = 0;
    mainLoop: for (const st of strings) {
        let vCount = 0;
        for (const letter of st) {
            if (vowels.includes(letter)) vCount++;
        }
        if (vCount < 3) continue;
        let repeated = false;
        for (let i = 0; i < st.length - 1; i++) {
            if (st[i] === st[i+1]) repeated = true;
            if (forbidden.includes(st[i] + st[i+1])) continue mainLoop;
        }
        if (repeated) niceStrings++;
    }
    return niceStrings;
};

const task2 = strings => {
    let niceStrings = 0;
    for (const st of strings) {
        let repeated = false;
        let pairs = false;
        for (let i = 0; i < st.length - 2; i++) {
            if (st[i] === st[i+2]) repeated = true;
            let pair = st[i] + st[i+1];
            if (st.lastIndexOf(pair) > i + 1) pairs = true;
        }
        if (repeated && pairs) niceStrings++;
    }
    return niceStrings;
};

let testdata = `ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`;

let testdata2 = `qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy`;

inputdata = splitLines(inputdata);

testdata = splitLines(testdata);
testdata2 = splitLines(testdata2);

console.log("");

doEqualTest(task1(testdata), 2);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata2), 2);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");