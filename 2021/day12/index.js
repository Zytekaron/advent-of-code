const input = readInput();

const graphNodes = {};

for (const [left, right] of input) {
    if (!graphNodes[left]) {
        graphNodes[left] = [];
    }
    graphNodes[left].push(right);

    if (!graphNodes[right]) {
        graphNodes[right] = [];
    }
    graphNodes[right].push(left);
}

// Part 1

function curse(name, visited = []) {
    const connections = graphNodes[name];

    let sum = 0;
    for (const con of connections) {
        if (con == con.toLowerCase() && visited.includes(con)) continue;

        if (con == 'end') {
            sum++;
            continue;
        }

        sum += curse(con, visited.concat(con));
    }

    return sum;
}

console.log(curse('start', ['start']));

// Part 2

function curse2(name, visited = [], visitedTwice = false) {
    const connections = graphNodes[name];

    let sum = 0;
    for (const con of connections) {
        if (con == 'end') {
            sum++;
            continue;
        }
        if (con == 'start') {
            continue;
        }

        // if we've already exhaused our double visit,
        // the current connection is lowercase, and
        // it's already been visited, then continue
        if (visitedTwice && visited.includes(con)) continue;

        const newVisited = con == con.toLowerCase()
            ? visited.concat(con)
            : visited; // no change, uppercase

        sum += curse2(con, newVisited, visitedTwice || visited.includes(con));
    }

    return sum;
}

console.log(curse2('start', ['start']));

function parse(line) {
    return line.split('-');
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
