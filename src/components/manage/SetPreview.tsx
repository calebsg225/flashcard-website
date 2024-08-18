import { useState } from "react";
import { SetData } from "../../types/setDataTypes";
import EditSet from "./EditSet";

interface SetPreviewProps {
  setNumber: number,
  setData: SetData,
  selectedSet: number,
  setSelectedSet: React.Dispatch<React.SetStateAction<number>>,
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

export const SetPreview = ({setNumber, setData, selectedSet, setSelectedSet, setActiveSection}: SetPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectSet = () => {
    if (isEditing) return;
    setSelectedSet(setNumber);
    setActiveSection('Study');
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }

  return (
    <div 
      className={`set-preview-container ${selectedSet === setNumber ? 'selected-set-preview' : ''}`}
      onClick={() => handleSelectSet()}
    >
      <EditSet isEditing={isEditing} setIsEditing={setIsEditing} setData={setData}/>
      <h2>{setData.title}</h2>
      <p>card count: {setData.cards.length}</p>
      <button onClick={(e) => handleEdit(e)}>edit</button>
    </div>
  )
}