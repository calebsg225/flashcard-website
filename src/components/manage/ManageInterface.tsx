import ManageToolbar from "./ManageToolbar";
import SetPreview from "./SetPreview";
import EditSet from "./EditSet";
import handleLocalStorage from "../../data/handleLocalStorage";
import { useState } from "react";
import ActionConfirmation from "./ActionConfirmation";

interface ManageInterfaceProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const ManageInterface = ({setActiveSection}: ManageInterfaceProps) => {
  // TODO: make sure user cannot study a set with no cards in it
  const [editing, setEditing] = useState(''); // unique id of set currently being edited. Empty string if none.
  const [deleting, setDeleting] = useState('');
  const setsData = handleLocalStorage.getSetsData(); // get up to date setsdata
  const setsKeys = Object.keys(setsData);

  const handleCancelDeleteSet = () => {
    setDeleting("");
  }

  const handleDeleteSet = () => {
    handleLocalStorage.deleteSet(deleting);
    setDeleting("");
  }

  const handleCreateSet = () => {
    const newSetUniqueId = `${Date.now()}`;
    setEditing(newSetUniqueId);
  }

  return (
    <section className="manage-interface-container">
      <ManageToolbar handleCreateSet={handleCreateSet} />
      {editing.length > 0 && <EditSet 
        editing={editing} 
        setEditing={setEditing} 
        setData={setsData[editing]}
      />}
      {deleting.length > 0 && <ActionConfirmation 
        message="" 
        confirmName="delete" 
        cancelFunction={handleCancelDeleteSet} 
        confirmFunction={handleDeleteSet}
      />}
      <div>
        {setsKeys.length ? (
          <div>
            {setsKeys.map((setId, i) => <SetPreview 
              setData={setsData[setId]} 
              setId={setId} 
              setEditing={setEditing} 
              setDeleting={setDeleting}
              setActiveSection={setActiveSection} 
              key={i} 
            />)}
          </div>
        ) : (
          <button onClick={() => handleCreateSet()}>Create New Set</button>
        )}
      </div>
    </section>
  );
}