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
    </div>
  );
}

export default Flashcard;