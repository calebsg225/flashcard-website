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
      <div>
        <p>{message}</p>
        <button onClick={() => handleCancel()}>Cancel</button>
        <button onClick={() => handleConfirm()}>{confirmName.charAt(0).toUpperCase()}{confirmName.substring(1)}</button>
      </div>
    </div>
  );
}

export default ActionConfirmation;