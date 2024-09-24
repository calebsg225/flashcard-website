import ManageToolbar from "./ManageToolbar";
import SetPreview from "./SetPreview";
import EditSet from "./EditSet";
import handleLocalStorage from "../../data/handleLocalStorage";
import { useState } from "react";

interface ManageInterfaceProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const ManageInterface = ({setActiveSection}: ManageInterfaceProps) => {
  const [editing, setEditing] = useState('');
  const setsData = handleLocalStorage.handleSetsData.getSetsData();
  const setsKeys = Object.keys(setsData);

  return (
    <section className="manage-interface-container">
      <ManageToolbar setEditing={setEditing} />
      {editing.length ? <EditSet editing={editing} setEditing={setEditing} setData={setsData[editing]}/> : <></>}
      {setsKeys.length ? (
        <>
          {setsKeys.map((setId, i) => <SetPreview setData={setsData[setId]} setActiveSection={setActiveSection} key={i} />)}
        </>
      ) : (
        <div>
          <p>Click here to add a new set!</p>
        </div>
      )}
    </section>
  );
}