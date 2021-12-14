const input = readInput();

// Part 1

let gamma = '', epsilon = '';

for (let i = 0; i < input[0].length; i++) {
    let zeros = 0;
    for (let j = 0; j < input.length; j++) {
        if (input[j][i] == '0') {
            zeros++;
        }
    }

    if (zeros > input.length / 2) {
        gamma += '0';
        epsilon += '1';
    } else {
        gamma += '1';
        epsilon += '0';
    }
}

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

// Part 2

let inputO2 = input.slice(0);
for (let i = 0; i < inputO2[0].length && inputO2.length > 1; i++) {
    let zeros = 0;
    for (let j = 0; j < inputO2.length; j++) {
        if (inputO2[j][i] == '0') {
            zeros++;
        }
    }

    const value = (zeros <= inputO2.length / 2 ? '1' : '0');
    inputO2 = inputO2.filter(e => e[i] == value);
}
let o2 = inputO2[0].join('');


let inputCO2 = input.slice(0);
for (let i = 0; i < inputCO2[0].length && inputCO2.length > 1; i++) {
    let zeros = 0;
    for (let j = 0; j < inputCO2.length; j++) {
        if (inputCO2[j][i] == '0') {
            zeros++;
        }
    }

    const value = (zeros > inputCO2.length / 2 ? '1' : '0');
    inputCO2 = inputCO2.filter(e => e[i] == value);
}
let co2 = inputCO2[0].join('');


console.log(parseInt(o2, 2) * parseInt(co2, 2));

function parse(line) {
    return line.split('');
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
