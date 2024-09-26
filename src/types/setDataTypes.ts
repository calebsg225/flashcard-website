type Cards = {
  [key: string]: {
    term: string,
    definition: string
  }
}

type SetData = {
  title: string,
  description: string,
  cards: Cards
}

type Sets = {[key: string]: SetData}

export type { Sets, SetData, Cards }