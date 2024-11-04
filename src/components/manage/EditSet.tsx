import { useState } from "react";
import handleLocalStorage from "../../data/handleLocalStorage";
import { SetData } from "../../types/setDataTypes"
import ActionConfirmation from "./ActionConfirmation";
import AlertPopup from "./AlertPopup";

// pop-up that shows up when editing a set
interface EditSetProps {
  editing: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
  setData: SetData
}

const EditSet = ({editing, setEditing, setData}: EditSetProps) => {

  const [totalAlertCount, setTotalAlertCount] = useState(0);
  const [alerts, setAlerts] = useState<{[key: string]: string}>({});
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

  const deleteAlert = (alertId: string) => {
    const newAlertsData = alerts;
    console.log(newAlertsData, alertId);
    delete newAlertsData[alertId];
    setAlerts(newAlertsData);
  }

  const handleOnSaveEdits = () => {
    let isProblem = false;
    let count = totalAlertCount;
    const problems: {[key: string]: string} = {};
    // verify the set has a title
    if (!newSetData.title.length) {
      isProblem = true;
      count++;
      problems[`${count}`] = "Each set must have a title. Add a title.";
      setTimeout(() => {
        deleteAlert(`${count}`);
      }, 5000);
    }
    // verify the set has a description
    if (!newSetData.description.length) {
      isProblem = true;
      count++;
      problems[`${count}`] = "Each set must have a description. Add a description.";
      setTimeout(() => {
        deleteAlert(`${count}`);
      }, 5000);
    }
    if (isProblem) {
      setTotalAlertCount(count);
      setAlerts({
        ...alerts,
        ...problems
      });
      return;
    }
    // TODO: vefity that each existing card has both a term and description?
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
      {/* contains all alert popups */}
      <div className="alerts-container">
        {Object.keys(alerts).map((alertId, i) => <AlertPopup message={alerts[alertId]} key={i} />)}
      </div>
      {/* main editor */}
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
          defaultValue={newSetData.description}
        />
        <div className="edit-cards-container">
          {Object.keys(newSetData.cards).map((cardId, i) => (
            <div className="edit-card-container" key={i}>
              <textarea
                className="edit-card-term" 
                name="term" 
                placeholder="Card Term..."
                onChange={(e) => handleEditCard(e, cardId)}
                defaultValue={newSetData.cards[cardId].term} 
                data-enable-grammarly="false"
              />
              <button className="card-expand">Expand</button>
              <button onClick={() => handleRemoveCard(cardId)} className="card-delete">Remove</button>
              <textarea
                className="edit-card-definition" 
                name="definition" 
                placeholder="Card Description..."
                onChange={(e) => handleEditCard(e, cardId)}
                defaultValue={newSetData.cards[cardId].definition} 
                data-enable-grammarly="false"
              />
            </div>
          ))}
          <button onClick={() => handleAddCard()} className="add-card">Add New Card</button>
        </div>
        <div className="confirmation-interface">
          <button className="cancel-button" onClick={() => {handleOnCancelEdits()}}>Cancel</button>
          <button className="save-button" onClick={() => {handleOnSaveEdits()}}>Save</button>
        </div>
      </div>
    </section>
  )
}

export default EditSet;