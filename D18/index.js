console.log("AOC 2015 - Day 18: Like a GIF For Your Yard");

const splitLines = data => data.split(String.fromCharCode(10));

const countNeighbours = ( x,y, grid ) => {
    const maxY = grid.length - 1;
    let n = 0;
    if ( y > 0) {
        n += (grid[y-1].charAt(x-1) === "#");
        n += (grid[y-1].charAt(x) === "#");
        n += (grid[y-1].charAt(x+1) === "#");
    } 
    n += (grid[y].charAt(x-1) === "#");
    n += (grid[y].charAt(x+1) === "#");
    if ( y < maxY) {
        n += (grid[y+1].charAt(x-1) === "#");
        n += (grid[y+1].charAt(x) === "#");
        n += (grid[y+1].charAt(x+1) === "#");
    } 
    return n;
};

const task1 = (grid, steps) => {

    for (let step = 0; step < steps; step++) {
        let lastGrid = [...grid];
        grid = grid.map((line, i) => {
            for (let j = 0; j < line.length; j++) {
                let light = line.charAt(j);
                const n = countNeighbours(j, i, lastGrid);
                if (light === "#" && n !== 2 && n !== 3) line = line.setCharAt(j, ".");
                if (light === "." && n === 3) line = line.setCharAt(j, "#");
            }
            return line;
        });
    }
    return grid.countChar('#');
};


const task2 = (grid, steps) => {
    grid[0] = grid[0].setCharAt(0, "#");
    grid[0] = grid[0].setCharAt(grid[0].length - 1, "#");
    grid[grid.length - 1] = grid[grid.length - 1].setCharAt(0, "#");
    grid[grid.length - 1] = grid[grid.length - 1].setCharAt(grid[0].length - 1, "#");

    const notCorner = (x,y,grid) => {
        if (x === 0 && y === 0) return false;
        if (x === 0 && y === grid.length - 1) return false;
        if (x === grid[0].length - 1 && y === 0) return false;
        if (x === grid[0].length - 1 && y === grid.length - 1) return false;
        return true;
    };

    for (let step = 0; step < steps; step++) {
        let lastGrid = [...grid];
        grid = grid.map((line, i) => {
            for (let j = 0; j < line.length; j++) {
                let light = line.charAt(j);
                const n = countNeighbours(j, i, lastGrid);
                if (light === "#" && n !== 2 && n !== 3 && notCorner(j,i,lastGrid)) line = line.setCharAt(j, ".");
                if (light === "." && n === 3) line = line.setCharAt(j, "#");
            }
            return line;
        });
    }
    return grid.countChar('#');
};

let testdata = `.#.#.#
...##.
#....#
..#...
#.#..#
####..`;

inputdata = splitLines(inputdata);

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata, 4), 4);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata, 100));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata, 5), 17);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata, 100));
console.timeEnd("Task 2");