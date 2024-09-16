interface FlashcardProps {
  term: string,
  definition: string,
  isFlipped: boolean,
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}

const Flashcard = ({term, definition, isFlipped, setIsFlipped}: FlashcardProps) => {

  return (
    <div className={`flashcard flex ${isFlipped ? 'definition' : 'term'}`} onClick={() => setIsFlipped(!isFlipped)}>
      {isFlipped ? definition : term}
      <div className={`flashcard-label ${isFlipped ? 'definition' : 'term'}`}>{isFlipped ? 'Definition' : 'Term'}</div>
    </div>
  );
}

export default Flashcard;