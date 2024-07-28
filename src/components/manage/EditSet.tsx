import { SetData } from "../../types/setDataTypes"

// pop-up that shows up when editing a set
interface EditSetProps {
  isEditing: boolean
  setIsEditing: Function
  setData: SetData
}

const EditSet = ({isEditing, setIsEditing, setData}: EditSetProps) => {
  const handleOnCancel = () => {
    setIsEditing(false);
  }

  const handleOnSave = () => {
    setIsEditing(false);
  }

  return (
    <section className={`edit-set-container ${isEditing ? '' : 'editor-hidden'}`}>
      <h2>{setData.title}</h2>
      <div>
        {setData.cards.map((v, i) => (
          <div key={i}>
            <input type="text" defaultValue={v.term} />
            <input type="text" defaultValue={v.definition} />
          </div>
        ))}
      </div>
      <div>
        <button className="cancel-button" onClick={() => {handleOnCancel()}}>Cancel</button>
        <button className="save-button" onClick={() => {handleOnSave()}}>Save</button>
      </div>
    </section>
  )
}

export default EditSet;