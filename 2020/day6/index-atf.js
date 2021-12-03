const input = readInput();

// Part 1
let sum = 0;
for (const line of input) {
    const arr = values(line).flat();
    sum += new Set(arr).size;
}
console.log(sum);

// Part 2
sum = 0;
for (const line of input) {
    const people = values(line);

    // occurrence of each letter
    const occ = {};
    for (const letter of people.flat()) {
        if (!occ[letter]) {
            occ[letter] = 0;
        }
        occ[letter]++;
    }

    // if the occurrence is equal to
    // the number of people, then each
    // one of the people answered yes
    for (const value of Object.values(occ)) {
        if (value == people.length) {
            sum++;
        }
    }
}
console.log(sum);

// Array<Array<Character>>
// outer = group, inner = person
function values(line) {
    return line
        .split('')
        .filter(e => /[a-z]/.test(e));
}

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/(\r?\n){2}/g);
}