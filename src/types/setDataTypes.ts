type CardArray = {
  term: string,
  definition: string
}[]

type SetData = {
  title: string,
  cards: CardArray
}

type SetArray = SetData[]

export type { SetArray, SetData, CardArray }