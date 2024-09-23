import { SelectedSet } from "../../types/setDataTypes";
import ManageToolbar from "./ManageToolbar";
import { SetPreview } from "./SetPreview";
import handleLocalStorage from "../../data/handleLocalStorage";

interface ManageInterfaceProps {
  selectedSet: SelectedSet;
  setSelectedSet: React.Dispatch<React.SetStateAction<SelectedSet>>;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const ManageInterface = ({selectedSet, setSelectedSet, setActiveSection}: ManageInterfaceProps) => {
  const setsData = handleLocalStorage.handleSetsData.getSetsData();
  const setsKeys = Object.keys(setsData);

  return (
    <section className="manage-interface-container">
      <ManageToolbar />
      {setsKeys.length ? (
        <>SET PREVIEWS HERE</>
      ) : (
        <div>
          <p>Click here to add a new set!</p>
        </div>
      )}
    </section>
  );
}