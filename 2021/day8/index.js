const input = readInput();

// Part 1

const input1 = input
    .map(s => s.split(' | ')[1])
    .map(s => s.split(' '))
    .flat();

let sum = 0;
for (const str of input1) {
    const n = str.length;
    if (n == 2 || n == 3 || n == 4 || n == 7) {
        sum++;
    }
}

console.log(sum);

// Part 2

const input2 = input
    .map(s => s.split(' | '))
    .map(s => {
        return s.map(v => v.split(' '));
    });

sum = 0;
for (const [line, test] of input2) {
    console.log(line);

    const segments = {};

    const oneLetters = new Set(find(line, str => str.length == 2).split(''));
    const fourLetters = new Set(find(line, str => str.length == 4).split(''));
    const sevenLetters = new Set(find(line, str => str.length == 3).split(''));
    const eightLetters = new Set(find(line, str => str.length == 7).split(''));

    const lengthFive = findArr(line, str => str.length == 5).map(v => new Set(v.split(''))); // 2, 3, 5
    const lengthSix = findArr(line, str => str.length == 6).map(v => new Set(v.split(''))); // 0, 6, 9

    // find the top segment
    for (const letter of sevenLetters) {
        if (!oneLetters.has(letter)) {
            segments['top'] = letter;
        }
    }

    // find the letters for #6
    let sixLetters;
    for (const word of lengthSix) {
        // if missing the top right segment, it's #6, not #0 or #9
        for (const letter of oneLetters) {
            if (!word.has(letter)) {
                sixLetters = word;
            }
        }
    }

    // find top right segment from #1 and #6
    for (const letter of oneLetters) {
        console.log(oneLetters, sixLetters, sixLetters.has(oneLetters[0]), sixLetters.has(oneLetters[1]))
        if (!sixLetters.has(letter)) {
            segments['tr'] = letter;
        }
    }

    // find the bottom right segment from #1
    const onesArr = Array.from(oneLetters);
    if (segments['tr'] == onesArr[0]) {
        segments['br'] = onesArr[1];
    } else {
        segments['br'] = onesArr[0];
    }

    // find #2, #3, and #5 from #1 (both matching segments)
    let twoLetters, threeLetters, fiveLetters;
    for (const word of lengthFive) {
        if (word.has(segments['tr'])) {
            if (word.has(segments['br'])) {
                threeLetters = word;
            } else {
                twoLetters = word;
            }
        } else {
            fiveLetters = word;
        }
    }
    console.log('two', twoLetters)

    // find b from #8 - #2 - #1
    const bLetters = new Set(eightLetters);
    for (const letter of oneLetters) bLetters.delete(letter);
    for (const letter of twoLetters) bLetters.delete(letter);
    segments['tl'] = Array.from(bLetters)[0];

    // find 3 from #8 - #7 - #5
    const eLetters = new Set(eightLetters);
    for (const letter of sevenLetters) eLetters.delete(letter);
    for (const letter of fiveLetters) eLetters.delete(letter);
    segments['bl'] = Array.from(eLetters)[0];

    // find 3 from #4 - #7 - tl
    const dLetters = new Set(fourLetters);
    for (const letter of sevenLetters) dLetters.delete(letter);
    dLetters.delete(segments['tl']);
    segments['mid'] = Array.from(dLetters)[0];

    // find the last letter from 8 - the rest
    const gLetters = new Set(eightLetters);
    const otherLetters = new Set(Object.values(segments));
    for (const letter of otherLetters) gLetters.delete(letter);
    segments['btm'] = Array.from(gLetters)[0];

    // test

    let zeroLetters, nineLetters;
    for (const word of lengthSix) {
        if (!word.has(segments['mid'])) {
            zeroLetters = word;
        }
        if (!word.has(segments['bl'])) {
            nineLetters = word;
        }
    }

    const numbers = [
        zeroLetters,
        oneLetters,
        twoLetters,
        threeLetters,
        fourLetters,
        fiveLetters,
        sixLetters,
        sevenLetters,
        eightLetters,
        nineLetters,
    ].map(letters => {
        return Array.from(letters)
            .sort()
            .join('');
    });

    let number = 0;
    for (let i = 0; i < test.length; i++) {
        number *= 10;

        const str = test[i]
            .split('')
            .sort()
            .join('');
        number += numbers.indexOf(str);
    }

    sum += number;
}

console.log(sum)

function find(arr, cb) {
    for (const elem of arr) {
        if (cb(elem)) return elem;
    }
    return null;
}

function findArr(arr, cb) {
    const a = [];
    for (const elem of arr) {
        if (cb(elem)) a.push(elem);
    }
    return a;
}

function parse(line) {
    return line.split(',').map(s => +s);
}

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n/g)
    // .map(parse);
}
