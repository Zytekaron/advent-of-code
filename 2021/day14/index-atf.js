const input = readInput();

const chem = input[0].split('');
const rest = new Map(input[1]
    .split('\n')
    .map(v => v.split(' -> ')));

// Part 1

console.log(solve(10));

// Part 2

console.log(solve(40));

function solve(iterations) {
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

    for (let i = 0; i < iterations; i++) {
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

    return max[0] - min[0];
}

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n\r?\n/g);
}
