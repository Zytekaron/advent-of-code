const input = readInput();

// Part 1

const chars = {
    '{': '}',
    '[': ']',
    '<': '>',
    '(': ')',
};
const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};
const openers = new Set(Object.keys(chars));

const part2 = [];

let score = 0;
for (const line of input) {
    let ok = true; // for part 2

    const stack = [];
    for (const char of line) {
        if (openers.has(char)) {
            stack.push(char);
        } else {
            const popped = stack.pop();
            if (chars[popped] != char) {
                score += points[char];
                
                ok = false; // for part 2
            }
        }
    }

    if (ok) { // for part 2
        part2.push(stack);
    }
}

console.log(score);

// Part 2

const points2 = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
};

const scores = [];
for (const stack of part2) {
    let score = 0;
    for (const elem of stack.reverse()) {
        score *= 5;
        score += points2[elem];
    }
    scores.push(score);
}

const sorted = scores.sort((a, b) => a - b);
const half = Math.floor(sorted.length / 2);

console.log(sorted[half]);

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n/g)
}
