const puzzle = "'{}mul(339,896)>^+!)^mul(799,303)don't()>mul(188,763)'<};who()select()%;+mul(924,355)mul(492,757) what()mul(582,171)][*+select()#mul(840,899){!when()from()%<mul(711,51)when()why()} ~mul(131,623)&select()^how()mul(966,541)[*>where()mul(318,527)} :!-'mul(530,886)?}>mul(937,475) $;),%:}mul(201,723)where()select()mul(673,729)why()who()";

const regexPattern = /mul\([0-9]+,[0-9]+\)/g;

const findMults = (puzzle) => {
  const multsAsArray = puzzle.match(regexPattern);
  return multsAsArray.reduce((acc, mult, i) => {
    const [first, last] = mult.split(',');
    const firstNbr = first.split('(')[1];
    const lastNbr = last.split(')')[0]
    return acc + Number(firstNbr) * Number(lastNbr);
  }, 0);
}

const findMultsWithToggle = (puzzle) => {
	const fragments = puzzle.split('do()');
	return fragments.reduce((acc, fragment) => {
    const doable = fragment.split("don't()")[0];
    const localResponse = findMults(doable);
    return acc + localResponse;
	}, 0);
}

console.log(`Puzzle 3.1: ${findMults(puzzle)}`);
console.log(`Puzzle 3.2: ${findMultsWithToggle(puzzle)}`);
