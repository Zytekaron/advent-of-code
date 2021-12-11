const input = readInput();

function markAdj(objs, r, c) {
    if (objs[r] == null || objs[r][c] == null) return; // out of range

    if (objs[r][c].hasLit) return; // already handled

    objs[r][c].value++;
    if (objs[r][c].value <= 9) return; // not a flasher
    
    objs[r][c].hasLit = true;
    objs[r][c].value = 0;

    markAdj(objs, r + 1, c - 1);
    markAdj(objs, r,     c - 1);
    markAdj(objs, r - 1, c - 1);

    markAdj(objs, r + 1, c);
    markAdj(objs, r - 1, c);

    markAdj(objs, r + 1, c + 1);
    markAdj(objs, r,     c + 1);
    markAdj(objs, r - 1, c + 1);
}

// Part 1

let inputObjs = [];
for (const r in input) {
    inputObjs[r] = {};

    for (const c in input[r]) {
        inputObjs[r][c] = {
            value: input[r][c],
            hasLit: false, // has lit this round
        }
    }
}

let flashes = 0;
for (let step = 0; step < 100; step++) {
    const toMark = [];
    for (const r in inputObjs) {
        for (const c in inputObjs[r]) {
            if (++inputObjs[r][c].value > 9) {
                toMark.push([+r, +c]);
            }
        }
    }
    for (const [r, c] of toMark) {
        markAdj(inputObjs, r, c);
    }

    for (const r in inputObjs) {
        for (const c in inputObjs[r]) {
            if (inputObjs[r][c].hasLit) {
                inputObjs[r][c].hasLit = false;
                flashes++;
            }
        }
    }
}

console.log(flashes);

// Part 2

inputObjs = [];
for (const r in input) {
    inputObjs[r] = {};

    for (const c in input[r]) {
        inputObjs[r][c] = {
            value: input[r][c],
            hasLit: false,
        }
    }
}

function done() {
    for (const r in inputObjs) {
        for (const c in inputObjs[r]) {
            if (inputObjs[r][c].value != 0) {
                return false;
            }
        }
    }
    return true;
}

let step;
for (step = 0; !done(); step++) {
    const toMark = [];
    for (const r in inputObjs) {
        for (const c in inputObjs[r]) {
            if (++inputObjs[r][c].value > 9) {
                toMark.push([+r, +c]);
            }
        }
    }
    for (const [r, c] of toMark) {
        markAdj(inputObjs, r, c);
    }

    for (const r in inputObjs) {
        for (const c in inputObjs[r]) {
            inputObjs[r][c].hasLit = false;
        }
    }
}

console.log(step);


function parse(line) {
    return line.split('').map(v => +v);
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
