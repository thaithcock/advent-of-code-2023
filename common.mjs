import fs from 'node:fs';

export const getInput = (filename) => {
    const file = fs.readFileSync(filename);
	const lines = file.toString().split('\n');
    return lines;
}

export const writeOutput = (filename, lines) => {
    fs.writeFileSync(filename, lines.join('\n').toString());
}