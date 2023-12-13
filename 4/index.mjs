import { getInput, writeOutput } from "../common.mjs";

const part1 = (input) => {
    const output = input
        .map(line => line.split(":"))
        .map(a => a[1]
            .trim()
            .split("|")
            .map(line => [...line.trim().matchAll(/[0-9]+/g)].map(a => parseInt(a)))
        )
        .map(([win, card]) => {
            const numbersInCard = win.filter(number => card.includes(number));
            console.log(numbersInCard);
            return Math.floor(
                Math.pow(2, (numbersInCard.length - 1))
            );
        })
    return output.concat(["=====", output.reduce((acc, number) => acc + number, 0)]);
}

// 0  1  2  3  4   5
// 0  1  2  4  8  16

// 2^(n-1)

const part2 = (input) => {
    // get the winning scratchcards
    // get the copies of winning scratchcards
    // count em up
}

writeOutput('./examples-solution.txt', part1(getInput('./examples.txt')));
writeOutput('./part1.txt', part1(getInput('./input.txt')));