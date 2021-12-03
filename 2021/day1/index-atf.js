const input = readInput();

// Part 1
let count = 0;
let max = input[0];

for (let i = 1; i < input.length; i++) {
    if (input[i] > max) {
        count++;
    }
    max = input[i];
}

console.log(count);

// Part 2
const data = per(3, input);
const first = data.next().value;

count = 0;
max = first.reduce((a, c) => a + c, 0);

for (const elem of data) {
    const sum = elem.reduce((a, c) => a + c, 0);
    if (sum > max) {
        count++;
    }
    max = sum;
}

console.log(count);



function* per(n, arr) {
    for (let i = 0; i < arr.length - (n - 1); i++) {
        yield arr.slice(i, i + n);
    }
}

function parse(line) {
    return parseInt(line);
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
