const [algorithmStr, imageStr] = readInput();

const algorithm = algorithmStr
    .split('')
    .map(v => v == '#');

const image = imageStr
    .split(/\r?\n/g)
    .map(line => line.split('').map(v => v == '#'));

// Part 1

function run(passes, gridSize) {
    const imageSize = image.length;

    let grid = Array(gridSize).fill(0)
        .map(() => Array(gridSize).fill(false));

    const half = Math.floor(gridSize / 2 - imageSize / 2);
    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[0].length; x++) {
            grid[x + half][y + half] = image[x][y];
        }
    }

    for (let pass = 0; pass < passes; pass++) {
        const isInfiniteStep = algorithm[0] && pass % 2 == 1; // odd-numbered steps are infinite steps

        const newGrid = grid.slice().map(v => v.slice());

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const points = [
                    grid[x + 0]?.[y + 0],
                    grid[x + 0]?.[y + 1] ?? isInfiniteStep,
                    grid[x + 0]?.[y + 2] ?? isInfiniteStep,
                    grid[x + 1]?.[y + 0] ?? isInfiniteStep,
                    grid[x + 1]?.[y + 1] ?? isInfiniteStep,
                    grid[x + 1]?.[y + 2] ?? isInfiniteStep,
                    grid[x + 2]?.[y + 0] ?? isInfiniteStep,
                    grid[x + 2]?.[y + 1] ?? isInfiniteStep,
                    grid[x + 2]?.[y + 2] ?? isInfiniteStep,
                ];

                const binary = points
                    .map(v => v ? '1' : '0')
                    .join('');

                const index = parseInt(binary, 2);

                newGrid[x][y] = algorithm[index];
            }
        }

        grid = newGrid;
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
