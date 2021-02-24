console.log("AOC 2015 - Day 24: It Hangs in the Balance");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(Number);

const task1 = packages => {
    const totalWeight = packages.sum();
    const oneGroup = totalWeight / 3;
    console.log(oneGroup);
    packages.sort((a, b) => b - a);
    let smallestQE = 10e10;
    for (let i = 0; i < packages.length; i++) {
        let p1 = packages[i];
        for (let j = i + 1; j < packages.length; j++) {
            let p2 = packages[j];
            for (let k = j + 1; k < packages.length; k++) {
                let p3 = packages[k];
                for (let l = k + 1; l < packages.length; l++) {
                    let p4 = packages[l];
                    for (let m = l + 1; m < packages.length; m++) {
                        let p5 = packages[m];
                        let lastPackage = oneGroup - (p1 + p2 + p3 + p4 + p5);
                        if (lastPackage === p1 || lastPackage === p2 || lastPackage === p3 || lastPackage === p4 || lastPackage === p5) continue;
                        if (!(packages.includes(lastPackage))) continue;

                        let QE = p1 * p2 * p3 * p4 * p5 * lastPackage;
                        if (QE < smallestQE) {
                            console.log("Found!", p1, p2, p3, p4, p5, lastPackage, QE);
                            smallestQE = QE;
                        }
                    }
                }
            }
        }
    }
    return smallestQE;
};

const task2 = packages => {
    const totalWeight = packages.sum();
    const oneGroup = totalWeight / 4;
    console.log(oneGroup);
    packages.sort((a, b) => b - a);
    let smallestQE = 10e10;

    for (let i = 0; i < packages.length; i++) {
        let p1 = packages[i];
        for (let j = i + 1; j < packages.length; j++) {
            let p2 = packages[j];
            for (let k = j + 1; k < packages.length; k++) {
                let p3 = packages[k];
                for (let l = k + 1; l < packages.length; l++) {
                    let p4 = packages[l];
                    let lastPackage = oneGroup - (p1 + p2 + p3 + p4);
                    if (lastPackage === p1 || lastPackage === p2 || lastPackage === p3 || lastPackage === p4) continue;
                    if (!(packages.includes(lastPackage))) continue;

                    let QE = p1 * p2 * p3 * p4 * lastPackage;
                    if (QE < smallestQE) {
                        console.log("Found!", p1, p2, p3, p4, lastPackage, QE);
                        smallestQE = QE;
                    }
                }
            }
        }
    }
    return smallestQE;
};

inputdata = prepare(splitLines(inputdata));

console.log("");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");