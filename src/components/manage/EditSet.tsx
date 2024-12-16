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
  const [cancelEditing, setCancelEditing] = useState('');
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

  const handleOnChangeSetData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSetData({
      ...newSetData,
      [e.target.name]: e.target.value
    })
  }

  const handleOnAddCard = () => {
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

  const handleOnEditCard = (e: React.ChangeEvent<HTMLTextAreaElement>, cardId: string) => {
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

  // functions for removing a card
  const handleOnRemoveCard = (cardId: string) => {
    setDeletingCard(cardId);
  }

  const handleOnCancelRemoveCard = () => {
    setDeletingCard("");
  }

  const handleOnConfirmRemoveCard = () => {
    const newCardsData = newSetData.cards;
    delete newCardsData[deletingCard];
    setNewSetData({
      ...newSetData,
      cards: newCardsData
    });
    setDeletingCard("");
  }

  // functions for canceling edits
  const handleOnCancelEdits = () => {
    setCancelEditing('canceling');
  }

  const handleOnCancelCancelEditing = () => {
    setCancelEditing('');
  }

  const handleOnConfirmCancelEditing = () => {
    setCancelEditing('');
    setEditing('');
  }

  return (
    <section className={`edit-set-container`}>
      {/* action confirmation popup, used to confirm deletion of a card */}
      {deletingCard.length > 0 && <ActionConfirmation 
        title="Remove Card" 
        message="This action is irreversible." 
        confirmName="remove" 
        cancelFunction={handleOnCancelRemoveCard} 
        confirmFunction={handleOnConfirmRemoveCard} 
      />}
      {/* action confirmation popup, used to confirm exiting editing mode */}
      {cancelEditing.length > 0 && <ActionConfirmation 
        title={"Exit Editing"} 
        message={"Are you sure you want to exit? Your changes will not be saved."} 
        confirmName={"Exit"} 
        cancelFunction={handleOnCancelCancelEditing} 
        confirmFunction={handleOnConfirmCancelEditing} 
      />}
      {/* main editor */}
      <div className="input-edits-container">
        <div className="input-container edit-title">
          <input  
            name="title" 
            placeholder="Set Title..." 
            maxLength={100}
            onChange={(e) => handleOnChangeSetData(e)} 
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
            onChange={(e) => handleOnChangeSetData(e)} 
            type="text" 
            defaultValue={newSetData.description}
            spellCheck="false"
          />
          {newSetData.description.length === 0 && <p>* A description is required.</p>}
        </div>
        <div className="edit-cards-container">
          <div className="blur-effect">
            {Object.keys(newSetData.cards).map((cardId, i) => (
              <EditCard
              handleEditCard={handleOnEditCard} 
              handleRemoveCard={handleOnRemoveCard} 
              cardId={cardId}
              cardTerm={newSetData.cards[cardId].term}
              cardDefinition={newSetData.cards[cardId].definition} 
              key={i}
              />
            ))}
            <button onClick={() => handleOnAddCard()} className="add-card">+</button>
          </div>
        </div>
        <div className="confirmation-interface">
          <button className="cancel-edits-button" onClick={() => {handleOnCancelEdits()}}>Exit</button>
          <button className="save-button" onClick={() => {handleOnSaveEdits()}}>Save</button>
        </div>
      </div>
    </section>
  )
}

export default EditSet;