interface ActionConfirmationProps {
  message: string,
  action: string,
  actionFunction: (confirm: boolean) => void;
}

const ActionConfirmation = ({message, action, actionFunction}: ActionConfirmationProps) => {

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>, action: boolean) => {
    e.stopPropagation();
    actionFunction(action);
  }

  return (
    <div className="action-confirmation">
      <div>
        <p>{message}</p>
        <button onClick={(e) => handleAction(e, false)}>Cancel</button>
        <button onClick={(e) => handleAction(e, true)}>{action.charAt(0).toUpperCase()}{action.substring(1)}</button>
      </div>
    </div>
  );
}

export default ActionConfirmation;