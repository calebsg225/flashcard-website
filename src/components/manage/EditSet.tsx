import { useState } from "react";
import handleLocalStorage from "../../data/handleLocalStorage";
import { SetData } from "../../types/setDataTypes"

// pop-up that shows up when editing a set
interface EditSetProps {
  editing: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
  setData: SetData
}

const EditSet = ({editing, setEditing, setData}: EditSetProps) => {

  const [newSetData, setNewSetData] = useState<SetData>(
    setData ? setData : {
      title: "",
      description: "",
      cards: []
    }
  );

  const handleOnCancel = () => {
    setEditing('');
  }

  const handleOnSave = () => {
    handleLocalStorage.updateSet(editing, newSetData);
    setEditing('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSetData({
      ...newSetData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddCard = () => {
    setNewSetData({
      ...newSetData,
      cards: [...newSetData.cards, {term: "", definition: ""}]
    })
  }

  const handleChangeCard = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  }

  return (
    <section className={`edit-set-container`}>
      <div className="input-edits-container">
        <input 
          className="edit-title" 
          name="title" 
          placeholder="Set Title..." 
          onChange={(e) => handleChange(e)} 
          type="text" 
          defaultValue={newSetData.title}
        />
        <input 
          className="edit-description" 
          name="description" 
          placeholder="Set Description..." 
          onChange={(e) => handleChange(e)} 
          type="text" 
        />
        <div className="edit-cards-container">
          {newSetData.cards.map((v, i) => (
            <div key={i}>
              <input 
                className="edit-card-term" 
                name="term" 
                placeholder="Card Term..."
                onChange={(e) => handleChangeCard(e, i)}
                type="text" 
                defaultValue={v.term} 
              />
              <div className="card-interface">
                <button className="card-expand">Expand</button>
                <button className="card-delete">Delete</button>
              </div>
              <input 
                className="edit-card-definition" 
                name="description" 
                placeholder="Card Description..."
                onChange={(e) => handleChangeCard(e, i)}
                type="text" 
                defaultValue={v.definition} 
              />
            </div>
          ))}
          <button onClick={() => handleAddCard()} className="add-card">Add New Card</button>
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