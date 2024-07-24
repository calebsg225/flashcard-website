interface ManageInterfaceProps {
  selectedSet: string;
  setSelectedSet: Function;
}

export const ManageInterface = ({selectedSet, setSelectedSet}: ManageInterfaceProps) => {
  return (
    <section className="manage-interface-container">
      <button onClick={() => setSelectedSet(selectedSet)}>{selectedSet}</button>
    </section>
  );
}