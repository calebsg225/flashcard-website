import { useState } from "react";
import handleLocalStorage from "../../data/handleLocalStorage";
import { SetData } from "../../types/setDataTypes"
import ActionConfirmation from "./ActionConfirmation";
import EditCard from "./EditCard";

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

  const handleOnSaveEdits = () => {
    let isProblem = false;
    // verify the set has a title
    if (!newSetData.title.length) {
      isProblem = true;
      // TODO: do something
    }
    // verify the set has a description
    if (!newSetData.description.length) {
      isProblem = true;
      // TODO: do something
    }
    if (isProblem) {
      return;
    }
    // TODO: vefity that each existing card has both a term and description?
    handleLocalStorage.updateSet(editing, newSetData);
    setEditing('');
  }

  const handleOnCancelEdits = () => {
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

  const handleEditCard = (e: React.ChangeEvent<HTMLTextAreaElement>, cardId: string) => {
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
      {/* action confirmation popup, used to confirm deletion of a card */}
      {deletingCard.length > 0 && <ActionConfirmation 
        title="Remove Card" 
        message="This action is irreversible." 
        confirmName="remove" 
        cancelFunction={handleCancelRemoveCard} 
        confirmFunction={handleConfirmRemoveCard} 
      />}
      {/* main editor */}
      <div className="input-edits-container">
        <div className="input-container edit-title">
          <input  
            name="title" 
            placeholder="Set Title..." 
            maxLength={100}
            onChange={(e) => handleChangeSetData(e)} 
            type="text" 
            defaultValue={newSetData.title}
            spellCheck="false"
          />
          {newSetData.title.length === 0 && <p>* A title is required.</p>}
        </div>
        <div className="input-container edit-description">
          <input  
            name="description" 
            placeholder="Set Description..." 
            maxLength={300}
            onChange={(e) => handleChangeSetData(e)} 
            type="text" 
            defaultValue={newSetData.description}
            spellCheck="false"
          />
          {newSetData.description.length === 0 && <p>* A description is required.</p>}
        </div>
        <div className="edit-cards-container">
          {Object.keys(newSetData.cards).map((cardId, i) => (
            <EditCard
              handleEditCard={handleEditCard} 
              handleRemoveCard={handleRemoveCard} 
              cardId={cardId}
              cardTerm={newSetData.cards[cardId].term}
              cardDefinition={newSetData.cards[cardId].definition} 
              key={i}
            />
          ))}
          <button onClick={() => handleAddCard()} className="add-card">+</button>
        </div>
        <div className="confirmation-interface">
          {/* TODO: have action confirmation window here */}
          <button className="cancel-button" onClick={() => {handleOnCancelEdits()}}>Cancel</button>
          <button className="save-button" onClick={() => {handleOnSaveEdits()}}>Save</button>
        </div>
      </div>
    </section>
  )
}

export default EditSet;