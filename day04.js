const puzzle = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const pArray = Array.from(puzzle);
const LINE_LENGTH = pArray.findIndex(x => x === '\n') + 1;

const getSurroundings = (pos) => [
	{ dir: 'WEST' , calc: (pos) => pos - 1 },
	{ dir: 'SWEST', calc: (pos) => pos + LINE_LENGTH - 1 },
	{ dir: 'SOUTH', calc: (pos) => pos + LINE_LENGTH },
	{ dir: 'SEST' , calc: (pos) => pos + LINE_LENGTH + 1 },
	{ dir: 'EST'  , calc: (pos) => pos + 1 },
	{ dir: 'NEST' , calc: (pos) => pos - LINE_LENGTH + 1 },
	{ dir: 'NORTH', calc: (pos) => pos - LINE_LENGTH },
	{ dir: 'NWEST', calc: (pos) => pos - LINE_LENGTH - 1},
];

/* Part 1 */
const xLetterPositions = pArray.reduce((acc, letter, i) => letter === 'X' ? [...acc, i] : acc, []);

const xmPositions = xLetterPositions.flatMap(x => {
	const aroundX = getSurroundings(x).filter(({ dir, calc }) => pArray[calc(x)] === 'M');
  return aroundX.map(m => ({ ...m, posM: m.calc(x)}));
});

const xmaPositions = xmPositions.flatMap(m => {
	const aroundM = getSurroundings(m.posM).filter(({ dir, calc}) => pArray[calc(m.posM)] === 'A' && dir === m.dir);
  return aroundM.map(a => ({ ...a, posA: a.calc(m.posM)}));
});

const xmasPositions = xmaPositions.flatMap(a => getSurroundings(a.posA).filter(({ dir, calc}) => pArray[calc(a.posA)] === 'S' && dir === a.dir));

console.log(`Puzzle 4.1: ${xmasPositions.length}`);

/* Part 2 */
const aLetterPositions = pArray.reduce((acc, letter, i) => letter === 'A' ? [...acc, i] : acc, []);

const aCrossLetters = aLetterPositions.map(a => getSurroundings(a)
	.filter(({ dir, calc}) => ['NWEST', 'SWEST', 'SEST', 'NEST'].includes(dir) && ['M', 'S'].includes(pArray[calc(a)]))
  .map(({ dir, calc }) => pArray[calc(a)])
).filter(a => a.length === 4);

const masCrosses = aCrossLetters.filter(([swest, sest, nest, nwest]) => ['SM', 'MS'].includes(`${nwest}${sest}`) && ['SM', 'MS'].includes(`${nest}${swest}`));

console.log(`Puzzle 4.2: ${masCrosses.length}`);
