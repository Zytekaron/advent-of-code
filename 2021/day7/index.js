const [input] = readInput();

// Part 1

const med = input.sort((a, b) => a - b)[Math.floor(input.length / 2)];

let sum = 0;
for (const num of input) {
    sum += Math.abs(num - med);
}

console.log(sum);

// Part 2

const inputAvg = input.reduce((acc, cur) => acc + cur, 0) / input.length;
const avg1 = Math.floor(inputAvg); // correct for my input
const avg2 = Math.ceil(inputAvg); // correct for test case

let sum1 = 0;
for (const num of input) {
    const n = Math.abs(num - avg1);

    sum1 += (n ** 2 + n) / 2;
}

let sum2 = 0;
for (const num of input) {
    const n = Math.abs(num - avg2);

    sum2 += (n ** 2 + n) / 2;
}

console.log(Math.min(sum1, sum2));

function parse(line) {
    return line.split(',').map(s => +s);
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
