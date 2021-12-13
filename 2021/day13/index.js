const [dotsArr, linesArr] = readInput();

const dots = dotsArr.map(v =>
    v.split(',').map(d => +d)
);
const lines = linesArr.map(v => {
    const [a, b] = v.replace('fold along ', '').split('=')
    return [a, +b]
});


// Part 1

let length = -Infinity;
let height = -Infinity;
for (const [x, y] of dots) {
    if (x >= height) height = x+1;
    if (y >= length) length = y+1;
}

const grid1 = Array(height)
    .fill(0)
    .map(() => Array(length).fill(false));

for (const [x, y] of dots) {
    grid1[x][y] = true;
}

for (const [line, value] of lines) {
    if (line == 'x') {
        for (let x = 0; x < value; x++) {
            for (let y = 0; y < length; y++) {
                grid1[x][y] ||= grid1[height - x - 1][y];
            }
        }

        grid1.length = value;
        height = value;
    } else {
        for (let x = 0; x < height; x++) {
            for (let y = 0; y < value; y++) {
                grid1[x][y] ||= grid1[x][length - y - 1];
            }
        }

        grid1.map(r => r.length = value);
        length = value;
    }
    break;
}

let sum = 0;
for (let x = 0; x < height; x++) {
    for (let y = 0; y < length; y++) {
        if (grid1[x][y]) sum++;
    }
}
console.log(sum);

// Part 2

length = -Infinity;
height = -Infinity;
for (const [x, y] of dots) {
    if (x >= height) height = x+1;
    if (y >= length) length = y+1;
}

const grid2 = Array(height)
    .fill(0)
    .map(() => Array(length).fill(false));

for (const [x, y] of dots) {
    grid2[x][y] = true;
}

for (const [line, value] of lines) {
    if (line == 'x') {
        for (let x = 0; x < value; x++) {
            for (let y = 0; y < length; y++) {
                grid2[x][y] ||= grid2[height - x - 1][y];
            }
        }

        grid2.length = value;
        height = value;
    } else {
        for (let x = 0; x < height; x++) {
            for (let y = 0; y < value; y++) {
                grid2[x][y] ||= grid2[x][length - y - 1];
            }
        }

        grid2.map(r => r.length = value);
        length = value;
    }
}

for (let y = 0; y < length; y++) {
    for (let x = 0; x < height; x++) {
        process.stdout.write(grid2[x][y] ? 'xx' : '  ');
    }
    process.stdout.write('\n');
}

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n\r?\n/)
        .map(v => v.split(/\r?\n/g));
}
