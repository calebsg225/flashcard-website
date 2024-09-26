import handleLocalStorage from "../../data/handleLocalStorage";
import { SetData } from "../../types/setDataTypes"

// pop-up that shows up when editing a set
interface EditSetProps {
  editing: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
  setData: SetData;
}

const EditSet = ({editing, setEditing, setData}: EditSetProps) => {
  const handleOnCancel = () => {
    if (!handleLocalStorage.hasSet(editing)) {
      // delete set completely
    }
    setEditing('');
  }

  const handleOnSave = () => {
    setEditing('');
    // TODO: add set to sets
  }

  return (
    <section className={`edit-set-container`}>
      <div className="input-edits-container">
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
      </div>
    </section>
  )
}

export default EditSet;