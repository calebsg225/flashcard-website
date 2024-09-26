import { SetData } from "../../types/setDataTypes";
import handleLocalStorage from "../../data/handleLocalStorage";
import { useState } from "react";
import ActionConfirmation from "./ActionConfirmation";

interface SetPreviewProps {
  setData: SetData,
  setId: string,
  setEditing: React.Dispatch<React.SetStateAction<string>>,
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const SetPreview = ({setData, setId, setEditing, setActiveSection}: SetPreviewProps) => {
  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false);
  
  const handleActionConfirmation = (confirm: boolean) => {
    if (confirm) {
      handleLocalStorage.deleteSet(setId);
      // TODO: make delete set update manage interface
    }
    setShowDeletionConfirmation(false);
  }

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
    setShowDeletionConfirmation(true);
  }

  // TODO: display some sort of icon indicating which set is stored as the current set
  return (
    <div 
      className={`set-preview-container`}
      onClick={() => handleSelectSet()}
    >
      {showDeletionConfirmation && <ActionConfirmation 
        message="Are you sure you would like to delete this set?"
        action="delete"
        actionFunction={handleActionConfirmation} 
      />}
      <h2>{setData.title}</h2>
      <h3>{setData.description}</h3>
      <p>card count: {Object.keys(setData.cards).length}</p>
      <button onClick={(e) => handleEdit(e)}>edit</button>
      <button onClick={(e) => handleDelete(e)}>delete</button>
    </div>
  )
}

export default SetPreview;