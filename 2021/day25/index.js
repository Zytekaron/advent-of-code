const input = readInput();

// Part 1

let grid = input.slice().map(arr => arr.slice());

let steps = 0;

let movedRight = true;
let movedDown = true;
while (movedRight || movedDown) {
    movedRight = false;
    movedDown = false;

    let newGrid = grid.slice().map(arr => arr.slice());

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] != '>') continue;

            const nextY = (y + 1) % grid[0].length;

            if (grid[x][nextY] == '.') {
                newGrid[x][nextY] = '>';
                newGrid[x][y] = '.';

                movedRight = true;
            }
        }
    }

    grid = newGrid;
    newGrid = grid.slice().map(arr => arr.slice());

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] != 'v') continue;

            const nextX = (x + 1) % grid.length;

            if (grid[nextX][y] == '.') {
                newGrid[nextX][y] = 'v';
                newGrid[x][y] = '.';

                movedDown = true;
            }
        }
    }

    grid = newGrid;
    steps++;
}

console.log(steps);

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n/g)
        .map(v => v.split(''));
}
