const input = readInput();

// Part 1

const inputObjs = [];
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
        markAdj(r, c);
    }

    function markAdj(r, c) {
        if (inputObjs[r] == null || inputObjs[r][c] == null) return; // out of range
    
        if (inputObjs[r][c].hasLit) return; // already handled
    
        inputObjs[r][c].value++;
        if (inputObjs[r][c].value <= 9) return; // not a flasher
        
        inputObjs[r][c].hasLit = true;
        inputObjs[r][c].value = 0;
    
        markAdj(r + 1, c - 1);
        markAdj(r,     c - 1);
        markAdj(r - 1, c - 1);
    
        markAdj(r + 1, c);
        markAdj(r - 1, c);
    
        markAdj(r + 1, c + 1);
        markAdj(r,     c + 1);
        markAdj(r - 1, c + 1);
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

const inputObjs2 = [];
for (const r in input) {
    inputObjs2[r] = {};

    for (const c in input[r]) {
        inputObjs2[r][c] = {
            value: input[r][c],
            hasLit: false, // has lit this round
        }
    }
}

function done() {
    for (const r in inputObjs2) {
        for (const c in inputObjs2[r]) {
            if (inputObjs2[r][c].value != 0) {
                return false;
            }
        }
    }
    return true;
}

let step;
for (step = 0; !done(); step++) {
    const toMark = [];
    for (const r in inputObjs2) {
        for (const c in inputObjs2[r]) {
            if (++inputObjs2[r][c].value > 9) {
                toMark.push([+r, +c]);
            }
        }
    }
    for (const [r, c] of toMark) {
        markAdj(r, c);
    }

    function markAdj(r, c) {
        if (inputObjs2[r] == null || inputObjs2[r][c] == null) return; // out of range
    
        if (inputObjs2[r][c].hasLit) return; // already handled
    
        inputObjs2[r][c].value++;
        if (inputObjs2[r][c].value <= 9) return; // not a flasher
        
        inputObjs2[r][c].hasLit = true;
        inputObjs2[r][c].value = 0;
    
        markAdj(r + 1, c - 1);
        markAdj(r,     c - 1);
        markAdj(r - 1, c - 1);
    
        markAdj(r + 1, c);
        markAdj(r - 1, c);
    
        markAdj(r + 1, c + 1);
        markAdj(r,     c + 1);
        markAdj(r - 1, c + 1);
    }

    for (const r in inputObjs2) {
        for (const c in inputObjs2[r]) {
            inputObjs2[r][c].hasLit = false;
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
