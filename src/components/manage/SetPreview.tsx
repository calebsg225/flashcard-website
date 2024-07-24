import { SetData } from "../../types/setDataTypes"

interface SetPreviewProps {
  setNumber: number,
  setData: SetData,
  selectedSet: number,
  setSelectedSet: Function,
  setActiveSection: Function
}

export const SetPreview = ({setNumber, setData, selectedSet, setSelectedSet, setActiveSection}: SetPreviewProps) => {

  const handleSelectSet = () => {
    setSelectedSet(setNumber);
    setActiveSection('Study');
  }

  return (
    <div 
      className={`set-preview-container ${selectedSet === setNumber ? 'selected-set-preview' : ''}`}
      onClick={() => handleSelectSet()}
    >
      <h2>{setData.title}</h2>
      <p>card count: {setData.cards.length}</p>
      <button>edit</button>
    </div>
  )
}