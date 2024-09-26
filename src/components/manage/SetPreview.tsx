import { SetData } from "../../types/setDataTypes";
import handleLocalStorage from "../../data/handleLocalStorage";

interface SetPreviewProps {
  setData: SetData,
  setId: string,
  setEditing: React.Dispatch<React.SetStateAction<string>>,
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const SetPreview = ({setData, setId, setEditing, setActiveSection}: SetPreviewProps) => {
  const handleSelectSet = () => {
    handleLocalStorage.handleCurrentSet.updateCurrentSet(setData);
    setActiveSection('Study');
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(setId);
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLocalStorage.handleSetsData.deleteSet(setId);
    // TODO: make sure set is also deleted from currentSet
  }

  return (
    <div 
      className={`set-preview-container`}
      onClick={() => handleSelectSet()}
    >
      <h2>{setData.title}</h2>
      <p>card count: {setData.cards.length}</p>
      <button onClick={(e) => handleEdit(e)}>edit</button>
      <button onClick={(e) => handleDelete(e)}>delete</button>
    </div>
  )
}

export default SetPreview;