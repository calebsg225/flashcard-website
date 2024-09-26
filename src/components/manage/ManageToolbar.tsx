interface ManageToolbarProps {
  handleCreateSet: () => void;
}

const ManageToolbar = ({handleCreateSet}: ManageToolbarProps) => {

  return (
    <div className="manage-toolbar-container">
      <button onClick={() => handleCreateSet()}>Create New Set</button>
    </div>
  )
}

export default ManageToolbar;