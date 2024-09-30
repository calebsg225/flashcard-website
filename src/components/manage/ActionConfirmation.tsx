interface ActionConfirmationProps {
  message: string;
  confirmName: string;
  cancelFunction: () => void;
  confirmFunction: () => void;
}

const ActionConfirmation = ({message, confirmName, cancelFunction, confirmFunction}: ActionConfirmationProps) => {

  const handleCancel = () => {
    cancelFunction();
  }
  
  const handleConfirm = () => {
    confirmFunction();
  }

  return (
    <div className="action-confirmation">
      <div className="action-confirmation-interface">
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