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

count = 0;
max = data[0].reduce((a, c) => a + c, 0);

for (let i = 1; i < data.length; i++) {
    const sum = data[i].reduce((a, c) => a + c, 0);
    if (sum > max) {
        count++;
    }
    max = sum;
}

console.log(count);



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

function per(n, arr) {
    const pers = [];
    for (let i = 0; i < arr.length - (n - 1); i++) {
        pers.push(arr.slice(i, i + n));
    }
    return pers;
}
