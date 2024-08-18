import { sampleSets } from "../../data/sample_sets";
import { SetPreview } from "./SetPreview";

interface ManageInterfaceProps {
  selectedSet: number;
  setSelectedSet: React.Dispatch<React.SetStateAction<number>>;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const ManageInterface = ({selectedSet, setSelectedSet, setActiveSection}: ManageInterfaceProps) => {
  return (
    <section className="manage-interface-container">
      {sampleSets.map((set, i) => (
        <SetPreview 
          setNumber={i}
          setData={set}
          setSelectedSet={setSelectedSet}
          setActiveSection={setActiveSection}
          selectedSet={selectedSet}
          key={i}
        />
      ))}
    </section>
  );
}