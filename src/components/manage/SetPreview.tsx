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

  const cardCount = Object.keys(setData.cards).length;

  const handleSelectSet = () => {
    if (!cardCount) return;
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
      className={`set-preview-container set-can${cardCount ? '' : 'not'}-be-studied`}
      onClick={() => handleSelectSet()}
    >
      <h2>{setData.title}</h2>
      <h3>{setData.description}</h3>
      <div className="set-preview-buttons">
        <p>{cardCount + " card" + (cardCount === 1 ? "" : "s")}</p>
        <button className="edit-button" onClick={(e) => handleEdit(e)}>Edit</button>
        <button className="delete-button" onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
    </div>
  )
}

export default SetPreview;