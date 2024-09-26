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
      cards: {}
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
      cards: {
        ...newSetData.cards,
        [`${Date.now()*2}`]: {
          term: "",
          definition: ""
        }
      }
    })
  }

  const handleChangeCard = (e: React.ChangeEvent<HTMLInputElement>, cardId: string) => {
    setNewSetData({
      ...newSetData,
      cards: {
        ...newSetData.cards,
        [cardId]: {
          ...newSetData.cards[cardId],
          [e.target.name]: e.target.value
        }
      }
    })
  }

  const handleDeleteCard = (cardId: string) => {
    const newCardsData = newSetData.cards;
    delete newCardsData[cardId];
    setNewSetData({
      ...newSetData,
      cards: newCardsData
    })
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
          {Object.keys(newSetData.cards).map((cardId, i) => (
            <div key={i}>
              <input 
                className="edit-card-term" 
                name="term" 
                placeholder="Card Term..."
                onChange={(e) => handleChangeCard(e, cardId)}
                type="text" 
                defaultValue={newSetData.cards[cardId].term} 
              />
              <div className="card-interface">
                <button className="card-expand">Expand</button>
                <button onClick={() => handleDeleteCard(cardId)} className="card-delete">Delete</button>
              </div>
              <input 
                className="edit-card-definition" 
                name="definition" 
                placeholder="Card Description..."
                onChange={(e) => handleChangeCard(e, cardId)}
                type="text" 
                defaultValue={newSetData.cards[cardId].definition} 
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