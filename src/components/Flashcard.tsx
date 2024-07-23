interface FlashcardProps {
  term: string,
  definition: string,
  isFlipped: boolean
}

const Flashcard = ({term, definition, isFlipped}: FlashcardProps) => {
  return (
    <div className="flashcard">{isFlipped ? definition : term}</div>
  );
}

export default Flashcard;