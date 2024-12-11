const puzzle = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

const pArray = Array.from(puzzle)

const OBSTACLE = "#"
const END_OF_PATH = ["\n", undefined]
const LINE_LENGTH = pArray.findIndex((x) => x === "\n") + 1

const initialGuard = pArray.findIndex((x) => x === "^")

const mapDirectionToCalc = {
    "NORTH": (pos) => pos - LINE_LENGTH,
    "EAST": (pos) => pos + 1,
    "SOUTH": (pos) => pos + LINE_LENGTH,
    "WEST": (pos) => pos - 1,
};

const mapDirectionToNext = {
    "NORTH": "EAST",
    "EAST": "SOUTH",
    "SOUTH": "WEST",
    "WEST": "NORTH"
};

const getCalc = (direction) => mapDirectionToCalc[direction];
const getNextDirection = (direction) => mapDirectionToNext[direction]

const runThroughtTheMaze = (maze) => {
    let isOut = false;
    let isLoop = false;
    let currentDirection = "NORTH"
    let currentPosition = initialGuard;

    const walkedThrought = [];

    while (!isOut) {
        const nextPosition = getCalc(currentDirection)(currentPosition)
        const tile = maze[nextPosition]

        if (END_OF_PATH.includes(tile)) {
            isOut = true;
        } else if (tile === OBSTACLE) {
            currentDirection = getNextDirection(currentDirection)
        } else {
            const currPosIndex = walkedThrought.findIndex(p => p === currentPosition);
            const nextPosIndex = walkedThrought.findIndex(p => p === nextPosition);
            const isPossiblyALoop = currPosIndex !== -1 && nextPosIndex !== -1;
            const isDefinitlyALoop = isPossiblyALoop && currPosIndex - nextPosIndex === -1;
            if (isDefinitlyALoop) {
                isOut = true;
                isLoop = true;
            } else {
                currentPosition = nextPosition
                walkedThrought.push(currentPosition);
            }
        }
    }

    return [walkedThrought, isLoop];
}

/* part 1 */
const [puzzleOnePositions, _] = runThroughtTheMaze(pArray);
const uniquePositions = [...new Set(puzzleOnePositions)]
console.log(`Puzzle 6.1: ${uniquePositions.length}`)

/* part 2
** Note: this solution doesn't exactly work.
** It worked for the example puzzle, but with my puzzle input, the result was off by 1 (ex: 1500 instead of 1499).
** So I'm assuming there's some false positive here I didn't identify.
*/

const puzzle2Solution = uniquePositions.reduce((acc, position, i) => {
    const newMaze = pArray.with(position, '#');
    const [walkedThrought, isLoop] = runThroughtTheMaze(newMaze);

    return isLoop ? acc + 1 : acc;
}, 0);

console.log(`Puzzle 6.2: ${puzzle2Solution}`);
