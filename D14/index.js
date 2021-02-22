console.log("AOC 2015 - Day 14: Reindeer Olympics");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds/;
    const reindeers = [];
    for (const reindeer of data) {
        const [ , name, flySpeed, flyTime, restTime ] = re.exec(reindeer);
        reindeers.push({ name, flySpeed: +flySpeed, flyTime: +flyTime, restTime: +restTime, cycleTime: +flyTime + +restTime, points: 0 });
    }
    return reindeers;
};

const countDistance = (reindeer, time) => {
    const cycles = Math.floor(time / reindeer.cycleTime);
    const rest = time % reindeer.cycleTime;

    let distance = cycles * reindeer.flySpeed * reindeer.flyTime;
    if (rest >= reindeer.flyTime) return distance + reindeer.flySpeed * reindeer.flyTime;
    else return distance + rest * reindeer.flySpeed;
};

const task1 = (reindeers, raceTime) => {
    let fastest = 0;
    for (const reindeer of reindeers) {
        const distance = countDistance(reindeer, raceTime);
        if (distance > fastest) fastest = distance;
    }
    return fastest;
};

const task2 = (reindeers, raceTime) => {
    for (let time = 1; time <= raceTime; time++) {
        const distances = [];
        for (const reindeer of reindeers) {
            const distance = countDistance(reindeer, time);
            distances.push({ reindeer, distance });
        }
        distances.sort((a,b) => b.distance - a.distance);
        bestDistance = distances[0].distance;
        distances.filter(i => i.distance === bestDistance).forEach(i => i.reindeer.points++);
    }
    reindeers.sort((a,b) => b.points - a.points);
    return reindeers[0].points;
}

let testdata = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata, 1000), 1120);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata, 2503));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata, 1000), 689);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata, 2503));
console.timeEnd("Task 2");