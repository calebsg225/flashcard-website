import { useState } from "react";

interface FlashcardProps {
  term: string,
  definition: string,
  startFlipped?: boolean
}

const Flashcard = ({term, definition, startFlipped = false}: FlashcardProps) => {
  const [flipped, setFlipped] = useState(startFlipped);

  return (
    <div className="flashcard flex" onClick={() => setFlipped(!flipped)}>
      {flipped ? definition : term}
    </div>
  );
}

export default Flashcard;