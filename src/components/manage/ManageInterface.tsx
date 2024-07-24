import { sampleSets } from "../../data/sample_sets";
import { SetPreview } from "./SetPreview";

interface ManageInterfaceProps {
  selectedSet: number;
  setSelectedSet: Function;
}

export const ManageInterface = ({selectedSet, setSelectedSet}: ManageInterfaceProps) => {
  return (
    <section className="manage-interface-container">
      {sampleSets.map((set, i) => (
        <SetPreview 
          setTitle={set.title} 
          setCards={set.cards} 
          selectedSet={selectedSet} 
          setSelectedSet={setSelectedSet}
          key={i}
        />
      ))}
    </section>
  );
}