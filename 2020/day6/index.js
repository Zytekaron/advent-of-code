const input = readInput();

// Part 1
let sum = 0;
for (const line of input) {
    const arr = letters(line);
    sum += new Set(arr).size;
}
console.log(sum);

// Part 2
sum = 0;
for (const line of input) {
    const people = line.split('\n').length;
    
    // occurrence of each letter
    const occ = {};
    for (const letter of letters(line)) {
        occ[letter] ? occ[letter]++ : occ[letter] = 1;
    }

    // if the occurrence is equal to
    // the number of people, then each
    // one of the people answered yes
    for (const value of Object.values(occ)) {
        if (value == people) {
            sum++;
        }
    }
}
console.log(sum);

// returns a single array of letters for the entire group
function letters(line) {
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