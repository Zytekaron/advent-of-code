const input = readInput();

const numbers = input.shift().split(',').map(n => parseInt(n));

const boards = [];

while (input.length) {
    input.shift();

    const board = [];
    for (let i = 0; i < 5; i++) {
        board[i] = input.shift().trim().split(/\s+/g).map(n => {
            return { value: parseInt(n), marked: false };
        });
    }
    boards.push(board);
}

// Part 1

let winner, winNumber;
game:
for (const number of numbers) {
    for (const board of boards) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].value == number) {
                    board[i][j].marked = true;
                }
            }
        }
        if (checkWin(board)) {
            winner = board;
            winNumber = number;
            break game;
        }
    }
}

let sum = 0;
for (const row of winner) {
    for (const elem of row) {
        if (elem.marked) continue;
        sum += elem.value;
    }
}
console.log(sum * winNumber);

// Part 2

for (const board of boards) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j].marked = false;
        }
    }
}

let won = 0;
game2:
for (const number of numbers) {
    for (const board of boards) {
        if (board.won) continue;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].value == number) {
                    board[i][j].marked = true;
                }
            }
        }

        if (checkWin(board)) {
            board.won = true;
            won++;
            if (won == boards.length) {
                winner = board;
                winNumber = number;
                break game2;
            }
        }
    }
}

sum = 0;
for (const row of winner) {
    for (const elem of row) {
        if (elem.marked) continue;
        sum += elem.value;
    }
}
console.log(sum * winNumber);

// Helpers

function checkWin(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i].every(e => e.marked)) {
            return true;
        }
        if (board.every(e => e[i].marked)) {
            return true;
        }
    }

    return false;
}

function readInput() {
    process.chdir(__dirname);
    return require('fs')
        .readFileSync('./input.txt')
        .toString()
        .trim()
        .split(/\r?\n/g);
}
