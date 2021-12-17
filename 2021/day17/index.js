const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');

const [[, xStart, xStop], [, yStart, yStop]] = readInput();

// Part 1

const inRange = (num, min, max) => num >= min && num <= max;

function hitsTarget(xv, yv) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 1000; i++) {
        x += xv;
        y += yv;

        xv += xv == 0 ? 0 : Math.abs(xv) / -xv;
        yv--;

        if (inRange(x, xStart, xStop) && inRange(y, yStart, yStop)) {
            return true;
        }
    }

    return false;
}

const allys = []; // for part 2
let maxyv = -200;
for (let xv = 0; xv < 1000; xv++) {
    if (xv == 0) continue;

    for (let yv = -1000; yv < 1000; yv++) {
        if (hitsTarget(xv, yv)) {
            maxyv = yv;
            allys.push(yv); // for part 2
        }
    }
}
console.log((maxyv * maxyv + maxyv) / 2);

// Part 2

console.log(allys.length);

function parse(line) {
    return /(?:x|y)=(-?\d+)\.\.(-?\d+)/g.exec(line);
}

function readInput() {
    process.chdir(__dirname);
    return require('fs')
            .readFileSync('./input.txt')
            .toString()
            .trim()
            .split(',')
            .map(parse);
}
