const input = readInput();

let maxX = -Infinity;
let maxY = -Infinity;
for (const [[x1, y1], [x2, y2]] of arr) {
    if (x1 > maxX) maxX = x1;
    if (x2 > maxX) maxX = x2;

    if (y1 > maxY) maxY = y1;
    if (y2 > maxY) maxY = y2;
}

// Part 1

const grid = Array(maxX + 1).fill(0)
    .map(() => Array(maxY + 1).fill(0));

for (let [[x1, y1], [x2, y2]] of input) {
    if (x1 == x2) {
        if (y2 < y1) { // swap if mis-ordered
            [y1, y2] = [y2, y1];
        }
        for (let y = y1; y <= y2; y++) {
            grid[x1][y]++;
        }
    }
    if (y1 == y2) {
        if (x2 < x1) { // swap if mis-ordered
            [x1, x2] = [x2, x1];
        }
        for (let x = x1; x <= x2; x++) {
            grid[x][y1]++;
        }
    }
    // other cases are ignored
}

let sum = 0;
for (const row of grid) {
    for (const elem of row) {
        if (elem >= 2) {
            sum++;
        }
    }
}

console.log(sum);

// Part 2

const grid2 = Array(maxX + 1).fill(0)
    .map(() => Array(maxY + 1).fill(0));

for (let [[x1, y1], [x2, y2]] of input) {
    let x = x1, y = y1;

    while (true) {
        grid2[x][y]++;

        if (x1 > x2) {
            x--;
            if (x < x2) break
        }
        if (x1 < x2) {
            x++;
            if (x > x2) break;
        }

        if (y1 > y2) {
            y--;
            if (y < y2) break
        }
        if (y1 < y2) {
            y++;
            if (y > y2) break;
        }
    }
}

sum = 0;
for (const row of grid2) {
    for (const elem of row) {
        if (elem >= 2) {
            sum++;
        }
    }
}

console.log(sum);



function parse(line) {
    return line.split(' -> ').map(s => {
        return s.split(',').map(s => +s);
    });
}

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n/g)
        .map(parse);
}
