console.log("AOC 2015 - Day 19: Medicine for Rudolph");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /^(\w+) => (\w+)$/;
    const rules = [];
    let molecule;
    for (const line of data) {
        if (re.test(line)) {
            const [ , start, finish ] = re.exec(line);
            rules.push({ start, finish });
        }
        else {
            if (line.length > 0) molecule = line;
        }
    }
    return [ molecule, rules ];
};

const task1 = ([ molecule, rules ]) => {

    const countMatches = (toMatch, main) => {
        let count = 0;
        const re = new RegExp(toMatch, "g");
        while (re.test(main)) count++;
        return count;
    }

    let changes = new Set();
    for (const rule of rules) {
        let matches = countMatches(rule.start, molecule);
        for (let i = 0; i < matches; i++) {
            t = -1;
            newMolecule = molecule.replace(new RegExp(rule.start, "g"), match => {
                t++;
                return t === i ? rule.finish : match;
            });
            changes.add(newMolecule);
        }
    }
    return changes.size;
};

// not necessary, just helped me reailize how the whole thing works
const processPart = (molecule, rules) => {
    const findAllReactants = (molecule, rules) => {

        const countMatches = (toMatch, main) => {
            let count = 0;
            const re = new RegExp(toMatch, "g");
            while (re.test(main)) count++;
            return count;
        }
    
        let reactants = new Set();
        for (const rule of rules) {
            if (rule.start === "e" && molecule.length > rule.finish.length) continue;
            let matches = countMatches(rule.finish, molecule);
            for (let i = 0; i < matches; i++) {
                t = -1;
                newMolecule = molecule.replace(new RegExp(rule.finish, "g"), match => {
                    t++;
                    return t === i ? rule.start : match;
                });
                reactants.add(newMolecule);
            }
        }
        return reactants;
    };

    let toProcess = new Set();
    toProcess.add(molecule);
    let steps = 0;
    while (true) {
        changed = false;
        const newToProcess = new Set();
        for (const product of toProcess) {
            let reactants = findAllReactants(product, rules);
            for (const reactant of reactants) {
                newToProcess.add(reactant);
                changed = true;
            }
        }
        if (!changed) return [ toProcess, steps ];
        console.log(newToProcess);
        steps++;
        toProcess = newToProcess;
    }
};

const task2 = ([ molecule, rules ]) => {
    let steps = 0;
    while (true) {
        for (const rule of rules) {
            if (rule.start === "e" && molecule.length > rule.finish.length) continue;
            while (molecule.indexOf(rule.finish) !== -1) {
                molecule = molecule.replace(rule.finish, rule.start);
                steps++;
            }
        }
        if (molecule === "e") return steps;
    }
}

let testdata = `e => H
e => O
H => HO
H => OH
O => HH

HOHOHO`;

inputdata = prepare(splitLines(inputdata));

let rules = inputdata[1];

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 7);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 6);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");