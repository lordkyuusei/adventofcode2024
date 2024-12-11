const puzzle = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const pArray = puzzle.split('\n').map(x => x.split(':').flatMap(x => x.trim().split(' ').map(Number))).map(x => [x[0], [...x.slice(1)]]);

/* mapping each operation on a binary number was such a cool idea... UNTIL PART 2*/
const operations = {
    0: (x, y) => x * y,
    1: (x, y) => x + y,
    2: (x, y) => Number(`${x}${y}`)
};

const operationsAsText = {
    0: (x, y) => `${x} * ${y}`,
    1: (x, y) => `${x} + ${y}`,
    2: (x, y) => `${x}||${y}`
}

const computePuzzleOne = (array) => array.reduce((acc, [testValue, equation]) => {
    const equationResults = [];
    const amountOfOperations = equation.length - 1
    const amountOfPossibilities = 1 << amountOfOperations;

    for (let i = 0; i < amountOfPossibilities; i++) {
        const [first, ...rest] = equation;
        const result = rest.reduce((acc, num, index) => {
            const operation = (i >> index) & 1;
            return operations[operation](acc, num);
        }, first);

        equationResults.push(result);
    }
    
    return equationResults.includes(testValue) ? acc + testValue : acc;
}, 0)

const computePuzzleTwo = (array, base) => array.reduce((acc, [testValue, equation], INDEX) => {
    const equationResults = [];
    const amountOfOperations = equation.length - 1
    const amountOfPossibilities = Math.pow(base, amountOfOperations);

    for (let i = 0; i < amountOfPossibilities; i++) {
        const [first, ...rest] = equation;

        const operationIndices = i
            .toString(base)
            .padStart(amountOfOperations, '0')
            .split('')
            .map(Number);

        const result = rest.reduce((acc, num, index) => {
            const operation = operationIndices[index];
            return operations[operation](acc, num);
        }, first);

        equationResults.push(result);
    }
    
    return equationResults.includes(testValue) ? acc + testValue : acc;
}, 0);

const result = computePuzzleOne(pArray, 2);
console.log(`Puzzle 7.1: ${result}`);

const result2 = computePuzzleTwo(pArray, 3);
console.log(`Puzzle 7.2: ${result2}`);
