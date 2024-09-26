type CardArray = {
  term: string,
  definition: string
}[]

type SetData = {
  title: string,
  description: string,
  cards: CardArray
}

type Sets = {[key: string]: SetData}

export type { Sets, SetData, CardArray }