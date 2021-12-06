const [input] = readInput();

// Part 1
// 'the naive solution'

const inputClone = input.slice(0);

for (let days = 0; days < 80; days++) {
    const len = inputClone.length;

    for (let i = 0; i < len; i++) {
        const value = inputClone[i] - 1;

        if (value < 0) {
            inputClone[i] = 6;
            inputClone.push(8);
        } else {
            inputClone[i] = value;
        }
    }
}

console.log(inputClone.length);

// Part 2

const counts = Array(9).fill(0);
for (const num of input) {
    counts[num]++;
}

for (let days = 0; days < 256; days++) {
    const repro = counts[0];

    for (let i = 1; i < counts.length; i++) {
        counts[i - 1] = counts[i];
    }

    counts[6] += repro;
    counts[8] = repro;
}

console.log(counts.reduce((acc, cur) => acc + cur));



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

