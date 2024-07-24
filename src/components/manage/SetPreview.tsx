import { CardArray } from "../../types/setDataTypes"

interface SetPreviewProps {
  setTitle: string,
  setCards: CardArray,
  selectedSet: number,
  setSelectedSet: Function
}

export const SetPreview = ({setTitle, setCards, selectedSet, setSelectedSet}: SetPreviewProps) => {
  return (
    <div className="set-preview-container">
      <h2>{setTitle}</h2>
      <p>card count: {setCards.length}</p>
      <button>edit</button>
    </div>
  )
}