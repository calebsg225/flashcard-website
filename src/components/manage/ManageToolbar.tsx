import { SetData } from "../../types/setDataTypes";
import handleLocalStorage from "../../data/handleLocalStorage";

interface ManageToolbarProps {
  setEditing: React.Dispatch<React.SetStateAction<string>>;
}

const ManageToolbar = ({setEditing}: ManageToolbarProps) => {

  const handleAddSet = () => {
    const newSet: SetData = {
      title: 'New Set',
      cards: []
    }
    const newSetUniqueId = `${Date.now()}`
    handleLocalStorage.handleSetsData.updateSet(newSetUniqueId, newSet);
    setEditing(newSetUniqueId);
  }

  return (
    <div className="manage-toolbar-container">
      <button onClick={() => handleAddSet()}>Add New Set</button>
    </div>
  )
}

export default ManageToolbar;