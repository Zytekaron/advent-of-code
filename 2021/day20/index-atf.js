const [algorithmStr, imageStr] = readInput();

const algorithm = algorithmStr
    .split('')
    .map(v => v == '#');

const image = imageStr
    .split(/\r?\n/g)
    .map(line => line.split('').map(v => v == '#'));

// Part 1

function run(passes, gridSize) {
    let grid = Array(gridSize).fill(0)
        .map(() => Array(gridSize).fill(false));

    const half = Math.floor(gridSize / 2 - image.length / 2);
    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[0].length; x++) {
            grid[x + half][y + half] = image[x][y];
        }
    }

    for (let pass = 0; pass < passes; pass++) {
        const isInfiniteStep = algorithm[0] && pass % 2 == 1; // odd-numbered steps are infinite steps

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                let index = 0;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (grid[x + i]?.[y + j] ?? isInfiniteStep) {
                            index += 1 << i * 3 + j; // non-working, but gets within 100 of the correct answer
                        }
                    }
                }

                grid[x][y] = algorithm[index];
            }
        }
    }

    let sum = 0;
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (grid[x][y]) {
                sum++;
            }
        }
    }

    return sum;
}

// Part 1

console.log(run(2, 110));

// Part 2

console.log(run(50, 300));



function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n\r?\n/g);
}
