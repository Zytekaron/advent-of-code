const input = readInput();

// Part 1
for (const seat of input) {
    seat.id = seat.row * 8 + seat.column
}

const sorted = input.sort((a, b) => b.id - a.id);
console.log(sorted[0]);

// Part 2
let i = sorted[0].id;
for (const seat of sorted) {
    if (i-- != seat.id) {
        // expected id, got id - 1
        console.log(seat.id + 1);
        break;
    }
}

// Part 2 -- After the fact
const min = sorted[sorted.length - 1];
const max = sorted[0];
for (let i = min; i <= max; i++) {
    if (input.find(e => e.id == i)) {
        console.log(input[i].id);
        break;
    }
}


function parse(line) {
    const sub1 = line.substring(0, 7)
        .replace(/B/g, '1')
        .replace(/F/g, '0');
    const sub2 = line.substring(7)
        .replace(/R/g, '1')
        .replace(/L/g, '0');
    return {
        row: parseInt(sub1, 2),
        column: parseInt(sub2, 2)
    }
}

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n/g)
        // .slice(0, 2)
        .map(parse);
}