const [, xStart, xStop, yStart, yStop] = readInput();

// Part 1

const inRange = (num, min, max) => num >= min && num <= max;

function hitsTarget(xv, yv) {
    if (xv >= 0 && xStop < 0 || xv <= 0 && xStop > 0) return false;
    if (yv >= 0 && yStop < 0 || yv <= 0 && yStop > 0) return false;

    let x = 0;
    let y = 0;
    while (true) {
        x += xv;
        y += yv;

        xv += xv == 0 ? 0 : Math.abs(xv) / -xv;
        yv--;

        if (yv <= 0 && y < yStart) return false;

        if (inRange(x, xStart, xStop) && inRange(y, yStart, yStop)) {
            return true;
        }
    }
}

const allys = []; // for part 2
let maxyv = -Infinity;
for (let xv = 0; xv < 200; xv++) {
    if (xv == 0) continue;

    for (let yv = -150; yv < 150; yv++) {
        if (hitsTarget(xv, yv)) {
            maxyv = yv;
            allys.push(yv); // for part 2
        }
    }
}
console.log((maxyv * maxyv + maxyv) / 2);

// Part 2

console.log(allys.length);

function readInput() {
    process.chdir(__dirname);
    return /x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/g.exec(
        require('fs')
            .readFileSync('./input.txt')
            .toString()
            .trim()
    );
}
