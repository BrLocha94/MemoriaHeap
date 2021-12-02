const fs = require('fs');

var commands = []

try {
    const data = fs.readFileSync('example.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        commands.push(line)
    });
} catch (err) {
    console.error(err);
}

//commands.map((command) => (
//    if(command)
//))