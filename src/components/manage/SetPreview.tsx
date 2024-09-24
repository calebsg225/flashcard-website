import { SetData } from "../../types/setDataTypes";
import handleLocalStorage from "../../data/handleLocalStorage";

interface SetPreviewProps {
  setData: SetData,
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const SetPreview = ({setData, setActiveSection}: SetPreviewProps) => {
  const handleSelectSet = () => {
    handleLocalStorage.handleCurrentSet.updateCurrentSet(setData);
    setActiveSection('Study');
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <div 
      className={`set-preview-container`}
      onClick={() => handleSelectSet()}
    >
      <h2>{setData.title}</h2>
      <p>card count: {setData.cards.length}</p>
      <button onClick={(e) => handleEdit(e)}>edit</button>
    </div>
  )
}

export default SetPreview;