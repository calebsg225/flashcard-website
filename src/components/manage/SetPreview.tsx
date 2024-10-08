import { SetData } from "../../types/setDataTypes";
import handleLocalStorage from "../../data/handleLocalStorage";

interface SetPreviewProps {
  setData: SetData,
  setId: string,
  setEditing: React.Dispatch<React.SetStateAction<string>>,
  setDeleting: React.Dispatch<React.SetStateAction<string>>,
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const SetPreview = ({setData, setId, setEditing, setDeleting, setActiveSection}: SetPreviewProps) => {

  const handleSelectSet = () => {
    handleLocalStorage.updateCurrentSet(setId);
    setActiveSection('Study');
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(setId);
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleting(setId);
  }

  // TODO: display some sort of icon indicating which set is stored as the current set
  return (
    <div 
      className={`set-preview-container`}
      onClick={() => handleSelectSet()}
    >
      <h2>{setData.title}</h2>
      <h3>{setData.description}</h3>
      <p>card count: {Object.keys(setData.cards).length}</p>
      <button onClick={(e) => handleEdit(e)}>edit</button>
      <button onClick={(e) => handleDelete(e)}>delete</button>
    </div>
  )
}

export default SetPreview;