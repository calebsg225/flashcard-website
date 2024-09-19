type CardArray = {
  term: string,
  definition: string
}[]

type SetData = {
  title: string,
  cards: CardArray
}

type SampleSets = {[key: string]: SetData}

type SelectedSet = 'sample' | 'user';

export type { SampleSets, SetData, CardArray, SelectedSet }