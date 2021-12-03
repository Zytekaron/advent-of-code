const input = readInput();

// Part 1
const sorted = input.sort((a, b) => a - b).reverse();
console.log(sorted[0]);

// Part 2
const min = sorted[sorted.length - 1];
const max = sorted[0];
for (let i = min; i <= max; i++) {
    if (input.find(e => e.id == i)) {
        console.log(input[i].id);
        break;
    }
}

function parse(line) {
    return parseInt(line
        .replace(/[B|R]/g, '1')
        .replace(/[F|L]/g, '0'), 2);
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