type CardArray = {
    term: string,
    definition: string
  }[]

type SetData = {
  title: string,
  cards: CardArray
}[]

export type { SetData, CardArray }