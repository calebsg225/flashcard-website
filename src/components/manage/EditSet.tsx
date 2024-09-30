import { useState } from "react";
import handleLocalStorage from "../../data/handleLocalStorage";
import { SetData } from "../../types/setDataTypes"
import ActionConfirmation from "./ActionConfirmation";

// pop-up that shows up when editing a set
interface EditSetProps {
  editing: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
  setData: SetData
}

const EditSet = ({editing, setEditing, setData}: EditSetProps) => {

  const [deletingCard, setDeletingCard] = useState('');
  const [newSetData, setNewSetData] = useState<SetData>(
    setData ? setData : {
      title: "",
      description: "",
      cards: {}
    }
  );

  const handleOnCancelEdits = () => {
    setEditing('');
  }

  const handleOnSaveEdits = () => {
    handleLocalStorage.updateSet(editing, newSetData);
    setEditing('');
  }

  const handleChangeSetData = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleEditCard = (e: React.ChangeEvent<HTMLInputElement>, cardId: string) => {
    // too much data changing?
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

  const handleCancelRemoveCard = () => {
    setDeletingCard("");
  }

  const handleConfirmRemoveCard = () => {
    const newCardsData = newSetData.cards;
    delete newCardsData[deletingCard];
    setNewSetData({
      ...newSetData,
      cards: newCardsData
    });
    setDeletingCard("");
  }

  const handleRemoveCard = (cardId: string) => {
    setDeletingCard(cardId);
  }

  return (
    <section className={`edit-set-container`}>
      {deletingCard.length > 0 && <ActionConfirmation 
        message="Remove this card? This action is irreversible." 
        confirmName="remove" 
        cancelFunction={handleCancelRemoveCard} 
        confirmFunction={handleConfirmRemoveCard} 
      />}
      <div className="input-edits-container">
        <input 
          className="edit-title" 
          name="title" 
          placeholder="Set Title..." 
          onChange={(e) => handleChangeSetData(e)} 
          type="text" 
          defaultValue={newSetData.title}
        />
        <input 
          className="edit-description" 
          name="description" 
          placeholder="Set Description..." 
          onChange={(e) => handleChangeSetData(e)} 
          type="text" 
        />
        <div className="edit-cards-container">
          {Object.keys(newSetData.cards).map((cardId, i) => (
            <div key={i}>
              <input 
                className="edit-card-term" 
                name="term" 
                placeholder="Card Term..."
                onChange={(e) => handleEditCard(e, cardId)}
                type="text" 
                defaultValue={newSetData.cards[cardId].term} 
              />
              <div className="card-interface">
                <button className="card-expand">Expand</button>
                <button onClick={() => handleRemoveCard(cardId)} className="card-delete">Remove</button>
              </div>
              <input 
                className="edit-card-definition" 
                name="definition" 
                placeholder="Card Description..."
                onChange={(e) => handleEditCard(e, cardId)}
                type="text" 
                defaultValue={newSetData.cards[cardId].definition} 
              />
            </div>
          ))}
          <button onClick={() => handleAddCard()} className="add-card">Add New Card</button>
        </div>
        <div>
          <button className="cancel-button" onClick={() => {handleOnCancelEdits()}}>Cancel</button>
          <button className="save-button" onClick={() => {handleOnSaveEdits()}}>Save</button>
        </div>
      </div>
    </section>
  )
}

export default EditSet;