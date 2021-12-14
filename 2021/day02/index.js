const input = readInput();

// Part 1

let dist = 0, depth = 0;

for (const [command, value] of input) {
    console.log(command, value)
    switch (command) {
        case 'up': depth -= value; break;
        case 'down': depth += value; break;
        case 'forward': dist += value; break;
    }
}

console.log(dist * depth);

// Part 2

let aim = 0;
dist = 0;
depth = 0;

for (const [command, value] of input) {
    switch (command) {
        case 'up':
            aim -= value;
            break;
        case 'down':
            aim += value;
            break;
        case 'forward':
            dist += value;
            depth += aim * value;
            break;
    }
}

console.log(dist * depth);



function parse(line) {
    const split = line.split(' ');
    return [split[0], +split[1]];
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
