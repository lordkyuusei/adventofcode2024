const puzzle = `9 12 14 16 17 18 15
86 88 91 94 95 95
15 18 20 21 23 25 28 32
70 72 74 77 78 83
57 60 62 64 63 64 65`;

const areAllDecreasing = (nums) => nums.every((n, i) => i === nums.length - 1 ? true : n > nums[i + 1]);
const areAllIncreasing = (nums) => nums.every((n, i) => i === nums.length - 1 ? true : n < nums[i + 1]);
const areDifferencesSafe = (nums) => nums.every((n, i) => i === nums.length - 1 ? true : [1, 2, 3].includes(Math.abs(n - nums[i + 1])));
const isReportSafe = (nums) => areDifferencesSafe(nums) && (areAllDecreasing(nums) || areAllIncreasing(nums));

const puzzleAsArray = puzzle.split('\n').map(x => x.split(' ').map(Number));
const safeReports = puzzleAsArray.filter(nums => isReportSafe(nums));

const dampenedSafeLevels = puzzleAsArray.filter(nums => {
	const differenceSafe = areDifferencesSafe(nums);
  const allDecreasing = areAllDecreasing(nums);
  const allIncreasing = areAllIncreasing(nums);
  
  if (differenceSafe && (allIncreasing || allDecreasing)) return true;
  
  return nums.some((n, idx) => {
  	const filtered = nums.filter((_, i) => i !== idx);
    return isReportSafe(filtered);
  });
});

console.log(`Puzzle 2.1: ${safeReports.length}`);
console.log(`Puzzle 2.2: ${dampenedSafeLevels.length}`);
