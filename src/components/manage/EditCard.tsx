interface EditCardProps {
  handleEditCard: (
    e: React.ChangeEvent<HTMLTextAreaElement>, 
    cardId: string
  ) => void,
  handleRemoveCard: (cardId: string) => void,
  cardId: string,
  cardTerm: string,
  cardDefinition: string
}

const EditCard = ({handleEditCard, handleRemoveCard, cardId, cardTerm, cardDefinition}: EditCardProps) =>{
  return (
    <div className="edit-card-container">
      <textarea
        className="edit-card-term" 
        name="term" 
        placeholder="Card Term..."
        onChange={(e) => handleEditCard(e, cardId)}
        defaultValue={cardTerm} 
        data-enable-grammarly="false"
        spellCheck="false"
      />
      <textarea
        className="edit-card-definition" 
        name="definition" 
        placeholder="Card Definition..."
        onChange={(e) => handleEditCard(e, cardId)}
        defaultValue={cardDefinition} 
        data-enable-grammarly="false"
        spellCheck="false"
      />
      <div>
        <button className="card-expand">Expand</button>
        <button onClick={() => handleRemoveCard(cardId)} className="card-delete">Remove</button>
      </div>
    </div>
  );
}

export default EditCard;