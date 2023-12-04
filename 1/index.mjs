import fs from 'node:fs';


const solve = (input) => {
    const numbers = 
    input.toString().split('\n')
        .map(getFirstAndLastDigit);
    fs.writeFileSync('./output.txt',
        numbers.join('\n')
         + "\n=====\n"
         + numbers.reduce((acc, v) => acc + v, 0).toString()
    )
}

const stringyNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const getFirstAndLastDigit = (line) => {
    const matched = [...line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g)];
    //console.log(matched)
    const numsOnly = matched.map(m => m[1]).join('')
    let firstCharacter = parseInt(numsOnly.substring(0,1));
    let lastCharacter = parseInt(numsOnly.substring(numsOnly.length - 1, numsOnly.length));
    // get first character
    if (isNaN(firstCharacter)) {
        firstCharacter = -1
        for (let i = 3; i <= 5; i++) {
            if (firstCharacter <= 0) {
                // console.log("checking first number", numsOnly.substring(0,i));
                firstCharacter = stringyNumbers.findIndex((num) => num == numsOnly.substring(0,i)) + 1;
                // console.log(firstCharacter);
            }
        }
    }    
    // get first character
    if (isNaN(lastCharacter)) {
        lastCharacter = -1
        for (let i = 3; i <= 5; i++) {
            if (lastCharacter <= 0) {
                // console.log("checking last number", numsOnly.substring(numsOnly.length - i, numsOnly.length));
                lastCharacter = stringyNumbers.findIndex((num) => num == numsOnly.substring(numsOnly.length - i, numsOnly.length)) + 1;
                // console.log(lastCharacter)
            }
        }
    }
    console.log(line, "=>", numsOnly, "=>", firstCharacter, lastCharacter);
    const stringy = `${firstCharacter}${lastCharacter}`;
    // return stringy;
    return parseInt(stringy)
}

const file = fs.readFileSync('./input.txt');
solve(file);