const puzzle = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const DELIMITER = `

`

const [rules, updates] = puzzle.split(DELIMITER)

const ruleSet = rules.split("\n").reduce((acc, rule) => {
  const [prev, next] = rule.split("|").map(Number)
  const idx = acc.findIndex((x) => x.prev === prev)

  return idx < 0
    ? [...acc, { prev, next: [next] }]
    : acc.with(idx, { ...acc[idx], next: [...acc[idx].next, next] })
}, [])

const updatesSet = updates.split("\n").map((x) => x.split(",").map(Number))

/* Part 1 */
const isUpdateValid = (update) =>
  update.every((num, i) => {
    const mustBeBefore = ruleSet
      .filter((x) => x.prev === num)
      .flatMap((y) => y.next)
    const mustBeAfter = ruleSet
      .filter((x) => x.next.includes(num))
      .map((x) => x.prev)

    const before = update.slice(0, i) ?? []
    const after = update.slice(i + 1, -1) ?? []

    return (
      after.every((beforeNum) => !mustBeAfter.includes(beforeNum)) &&
      before.every((afterNum) => !mustBeBefore.includes(afterNum))
    )
  })

const validAndInvalidUpdates = updatesSet.reduce(
  (acc, update) =>
    isUpdateValid(update)
      ? [[...acc[0], update], [...acc[1]]]
      : [[...acc[0]], [...acc[1], update]],
  [[], []],
)

const sumOfValid = validAndInvalidUpdates[0].reduce(
  (acc, update) => acc + update[Math.floor(update.length / 2)],
  0,
)

console.log(`Puzzle 5.1: ${sumOfValid}`)

/* Part 2 */
const fixedInvalidUpdates = validAndInvalidUpdates[1].map((update, i) => {
  const updateRuleSet = update.map((upd) => ruleSet.find((x) => x.prev === upd))
  return updateRuleSet.reduce(
    (acc, _) => {
      const nexts = acc.set.flatMap((x) => x.next)
      const prev = acc.set.find((x) => !nexts.includes(x.prev))
      return {
        ordered: [...acc.ordered, prev.prev],
        set: acc.set.filter((x) => x.prev !== prev.prev),
      }
    },
    { ordered: [], set: updateRuleSet },
  ).ordered;
})

const sumOfInvalid = fixedInvalidUpdates.reduce(
  (acc, update) => acc + update[Math.floor(update.length / 2)],
  0,
)

console.log(`Puzzle 5.1: ${sumOfInvalid}`)
