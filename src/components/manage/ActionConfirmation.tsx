interface ActionConfirmationProps {
  title: string;
  message: string;
  confirmName: string;
  cancelFunction: () => void;
  confirmFunction: () => void;
}

const ActionConfirmation = ({title, message, confirmName, cancelFunction, confirmFunction}: ActionConfirmationProps) => {

  const handleCancel = () => {
    cancelFunction();
  }
  
  const handleConfirm = () => {
    confirmFunction();
  }

  return (
    <div className="action-confirmation">
      <div className="action-confirmation-interface">
        <h3>{title}</h3>
        <p>{message}</p>
        <div>
          <button className="cancel-button" onClick={() => handleCancel()}>Cancel</button>
          <button className="confirm-button" onClick={() => handleConfirm()}>{confirmName.charAt(0).toUpperCase()}{confirmName.substring(1)}</button>
        </div>
      </div>
    </div>
  );
}

export default ActionConfirmation;