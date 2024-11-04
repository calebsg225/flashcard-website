interface AlertPopupProps {
  message: string | undefined
}

const AlertPopup = ({message}: AlertPopupProps) => {

  const onDelete = () => {}

  return (
    <div className="alert-popup">
      <p>{message}</p>
      {/* TODO: replace X char with X image */}
      <button onClick={() => onDelete()}>X</button>
    </div>
  )
}

export default AlertPopup;