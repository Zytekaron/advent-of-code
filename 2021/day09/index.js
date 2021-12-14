const input = readInput();

// Part 1

const points = []; // for part 2

let sum = 0;
for (let r = 0; r < input.length; r++) {
    const row = input[r];
    for (let c = 0; c < row.length; c++) {
        const value = row[c];

        const up = input[r - 1]?.[c] ?? Infinity;
        const down = input[r + 1]?.[c] ?? Infinity;
        const left = input[r][c - 1] ?? Infinity;
        const right = input[r][c + 1] ?? Infinity;

        if (value < up && value < down && value < left && value < right) {
            sum += 1 + value;
            points.push([r, c]);
        }
    }
}
console.log(sum);

// Part 2

const res = points
    .map(p => makeBasin(...p))
    .map(b => b.length);

const result = res
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => acc * cur, 1);

console.log(result);

function makeBasin(r, c, visited = new Set(), basin = []) {
    const id = `(${r}, ${c})`;
    const value = input[r]?.[c];

    if (value == null || value == 9 || visited.has(id)) return;
    visited.add(id);

    basin.push(value);

    const up = input[r - 1]?.[c] ?? Infinity;
    const down = input[r + 1]?.[c] ?? Infinity;
    const left = input[r]?.[c - 1] ?? Infinity;
    const right = input[r]?.[c + 1] ?? Infinity;

    if (value < up) {
        makeBasin(r - 1, c, visited, basin);
    }
    if (value < down) {
        makeBasin(r + 1, c, visited, basin);
    }
    if (value < left) {
        makeBasin(r, c - 1, visited, basin);
    }
    if (value < right) {
        makeBasin(r, c + 1, visited, basin);
    }

    return basin;
}


function parse(line) {
    return line
        .split('')
        .map(v => +v);
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
