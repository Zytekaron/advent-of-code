const { spawn } = require('child_process');

const now = new Date();
const problem = now.getUTCFullYear() + '/day' + now.getUTCDate()
    + (process.argv[2] ? '-atf' : ''); // after-the-fact

console.log('running', problem);

const proc = spawn('node', [problem]);

proc.stdout.on('data', data => process.stdout.write(data));
proc.stderr.on('data', data => process.stderr.write(data));

proc.on('exit', code => {
    console.log('exited with code', code.toString());
});
