const input = readInput();

const chem = input[0].split('');
const rest = new Map(input[1]
    .split('\n')
    .map(v => v.split(' -> ')));

// Part 1

let curChem = chem;

for (let runs = 0; runs < 10; runs++) {
    const newChem = [];
    for (let i = 1; i < curChem.length; i++) {
        const left = curChem[i - 1];
        const right = curChem[i];

        newChem.push(left);
        if (rest.has(left + right)) {
            // console.log(left, right, 'insert', rest.get(left+right))
            newChem.push(rest.get(left + right));
        }
    }
    newChem.push(curChem[curChem.length - 1]); // last 'right' is not added since it's the left of no pair
    curChem = newChem;
}

const freqs = {};
for (const elem of curChem) {
    if (!freqs[elem]) {
        freqs[elem] = 0;
    }
    freqs[elem]++;
}

let min = [Infinity];
let max = [-Infinity];
for (const [char, freq] of Object.entries(freqs)) {
    if (freq < min[0]) min = [freq, char];
    if (freq > max[0]) max = [freq, char];
}

console.log(max[0] - min[0]);

// Part 2

let freqs2 = {};
for (const value of rest.keys()) {
    freqs2[value] = 0;
}
for (let i = 1; i < chem.length; i++) {
    freqs2[chem[i - 1] + chem[i]]++;
}

const chCounts = {};
for (const char of chem) {
    if (!chCounts[char]) {
        chCounts[char] = 0;
    }
    chCounts[char]++;
}

for (let i = 0; i < 40; i++) {
    for (const [key, count] of Object.entries(freqs2)) {
        const insert = rest.get(key);

        const k1 = key[0] + insert;
        const k2 = insert + key[1];

        freqs2[key] -= count;
        freqs2[k1] += count;
        freqs2[k2] += count;

        if (!chCounts[insert]) {
            chCounts[insert] = 0;
        }
        chCounts[insert] += count;
    }
}

min = [Infinity];
max = [-Infinity];
for (const [char, freq] of Object.entries(chCounts)) {
    if (freq < min[0]) min = [freq, char];
    if (freq > max[0]) max = [freq, char];
}

console.log(max[0] - min[0]);

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n\r?\n/g);
}
