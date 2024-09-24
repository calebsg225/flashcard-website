import { SetData } from "../../types/setDataTypes"

// pop-up that shows up when editing a set
interface EditSetProps {
  editing: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
  setData: SetData;
}

const EditSet = ({editing, setEditing, setData}: EditSetProps) => {
  const handleOnCancel = () => {
    setEditing('');
  }

  const handleOnSave = () => {
    setEditing('');
  }

  return (
    <section className={`edit-set-container ${editing.length ? '' : 'editor-hidden'}`}>
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