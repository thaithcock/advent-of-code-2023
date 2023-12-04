import fs from 'node:fs';
const file = fs.readFileSync('./3/input.txt');

const part1 = (input) => {
	const lines = input.toString().split('\n');
    const specialCharacters = lines
        .flatMap(findSpecialCharacters);
    const partNumbers = lines
		.flatMap(findPartNumbers)
		.filter((part) => isActuallyAPart(part, specialCharacters))
		.reduce((acc, part) =>{ 
            acc += parseInt(part.part)
            return acc;
        }, 0)

    return partNumbers;
}

const findSpecialCharacters = (line, index) => {
    const charactersRegexed = [...line.trim().matchAll(/[^a-zA-Z\.0-9]+/g)]
    console.log(JSON.stringify(charactersRegexed));
    return charactersRegexed.map(character => { return {
        character: character[0],
        line: index,
        index: character.index,
    }})
}

const findPartNumbers = (line, index) => {
    const partNumbersRegexed = [...line.trim().matchAll(/[0-9]+/g)]
    //console.log(partNumbersRegexed);
    return partNumbersRegexed.map(part => { 
        return {
            part: part[0],
            line: index,
            index: part.index
        }
    })
}


const isActuallyAPart = (part, specialCharacters) => {
    const matchingCharacters = specialCharacters
        .filter(specialCharacter => Math.abs(specialCharacter.line - part.line) <= 1)
        .filter(specialCharacter => specialCharacter.index - part.index <= part.part.length && specialCharacter.index - part.index >= -1);
        
    console.log("checking", JSON.stringify(part), "...", matchingCharacters.length > 0, JSON.stringify(matchingCharacters))
    
    return matchingCharacters.length > 0;
}

// fs.writeFileSync('./3/part1.txt', part1(file).toString());


const findGearCharacters = (specialCharacter) => {
    return specialCharacter.character == "*";
}

const getParts = (gear, partNumbers) => {
    const gearParts = partNumbers
        .filter(part => Math.abs(gear.line - part.line) <= 1)
        .filter(part => gear.index - part.index <= part.part.length && gear.index - part.index >= -1)
    console.log("checking", JSON.stringify(gear), gearParts.length == 2, gearParts.length);
    return gearParts;
}

const getGearRatio = (parts) => {
    return parts.reduce((ratio, part) => ratio * parseInt(part.part), 1);
}

const part2 = (input) => {
	const lines = input.toString().split('\n');
    const partNumbers = lines
		.flatMap(findPartNumbers);

    const ratios = lines
        .flatMap(findSpecialCharacters)
        .filter(findGearCharacters)
        .map((gear) => getParts(gear, partNumbers))
        .filter(parts => parts.length == 2)
        .map(getGearRatio)
        .reduce((acc, ratio) => acc + ratio, 0)

    return ratios;
}

fs.writeFileSync('./3/part2.txt', part2(file).toString());
