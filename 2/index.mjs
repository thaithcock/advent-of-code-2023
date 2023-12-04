import fs from 'node:fs';

const part1 = (input) => {
	const output = input.toString().split('\n')
		.map(toGame)
		.filter(validGame)
		.reduce((acc, game) => acc + game.id, 0)
		.toString();
	fs.writeFileSync('./2/part1.txt', output)
}


// Game 1: 2 blue, 3 red; 4 blue, 5 green; 2 green
const toGame = (line) => {
	const [idString, roundString] = line.split(":");
	const rounds = roundString.split(";")
		.filter(a => a != "")
		.map(hand => hand.trim().split(',').filter(a => a != "").map(dice => dice.split(" ").filter(a => a != "")));
	console.log(rounds.toString());
	return {
		id: parseInt(idString.split(" ")[1]),
		// 	[
		// 		[
		// 			["2","blue"],["3","red"]
		// 		],
		// 		[
		// 			["4","blue"],["5","green"]
		// 		],
		// 		[
		// 			["2","green"]
		// 		]
		// ]
		rounds: rounds
	};
}

const MAX_GREEN = 13;
const MAX_RED = 12;
const MAX_BLUE = 14;
const validGame = (game) => {
	return game.rounds.every((round, index) => round.every(dice => {
		// get what kind of dice
		const type = dice[1];
		console.log("game", game.id, "round", index, "checking dice color", type, ":", type == "blue", type == "red", type == "green")
		if (type == "blue") {
			return dice[0] <= MAX_BLUE;
		} else if (type == "red") {
				return dice[0] <= MAX_RED;
		} else if (type == "green") {
				return dice[0] <= MAX_GREEN;
		} else {
			throw new Error("what kind of dice is this? " + dice[1]);
		}
	}))
}



const part2 = (input) => {
	const output = input.toString().split('\n')
		.map(toGame)
		.map(toMinimumPossibleCubes)
		.map(toPower)
		.reduce((acc, power) => acc + power, 0)
		.toString();
	fs.writeFileSync('./2/part2.txt', output)
}

const toMinimumPossibleCubes = (game) => {
	let minimumReds = 0;
	let minimumGreens = 0;
	let minimumBlues = 0;
	game.rounds.forEach((round, index) => round.forEach(dice => {
		console.log("game", game.id, "round", index, "checking", dice.toString());
		const type = dice[1];
		const num = parseInt(dice[0]);
		if (type == "blue") {
			minimumBlues = minimumBlues < num ? num : minimumBlues;
		} else if (type == "red") {
			minimumReds = minimumReds < num ? num : minimumReds;
		} else if (type == "green") {
			minimumGreens = minimumGreens < num ? num : minimumGreens;
		} else {
			throw new Error("what kind of dice is this? " + dice[1]);
		}
	}))
	return {
		red: minimumReds,
		green: minimumGreens,
		blue: minimumBlues,
	}
}

const toPower = (minDice) => {
	return minDice.red * minDice.green * minDice.blue;
}

const file = fs.readFileSync('./2/input.txt');
part2(file);