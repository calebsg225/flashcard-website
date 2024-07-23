type SetData = {
  [key: string]: {
    cards: {
      [key: number]: {
        term: string,
        definition: string
      }
    }
  }
}

export type { SetData }