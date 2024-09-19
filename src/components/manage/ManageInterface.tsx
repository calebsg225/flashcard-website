import { sampleSets } from "../../data/sample_sets";
import { SelectedSet } from "../../types/setDataTypes";
import { SetPreview } from "./SetPreview";

interface ManageInterfaceProps {
  selectedSet: SelectedSet;
  setSelectedSet: React.Dispatch<React.SetStateAction<SelectedSet>>;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const ManageInterface = ({selectedSet, setSelectedSet, setActiveSection}: ManageInterfaceProps) => {
  return (
    <section className="manage-interface-container">
      
    </section>
  );
}