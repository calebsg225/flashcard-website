import ManageToolbar from "./ManageToolbar";
import SetPreview from "./SetPreview";
import EditSet from "./EditSet";
import handleLocalStorage from "../../data/handleLocalStorage";
import { useState } from "react";

interface ManageInterfaceProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const ManageInterface = ({setActiveSection}: ManageInterfaceProps) => {
  const [editing, setEditing] = useState(''); // unique id of set currently being edited. Empty string if none.
  const setsData = handleLocalStorage.getSetsData(); // get up to date setsdata
  const setsKeys = Object.keys(setsData);

  const handleCreateSet = () => {
    const newSetUniqueId = `${Date.now()}`;
    setEditing(newSetUniqueId);
  }

  return (
    <section className="manage-interface-container">
      <ManageToolbar handleCreateSet={handleCreateSet} />
      {editing.length > 0 && <EditSet editing={editing} setEditing={setEditing} setData={setsData[editing]}/>}
      <div>
        {setsKeys.length ? (
          <div>
            {setsKeys.map((setId, i) => <SetPreview setData={setsData[setId]} setId={setId} setEditing={setEditing} setActiveSection={setActiveSection} key={i} />)}
          </div>
        ) : (
          <button onClick={() => handleCreateSet()}>Create New Set</button>
        )}
      </div>
    </section>
  );
}