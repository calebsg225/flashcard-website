import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import handleLocalStorage from "../../data/handleLocalStorage";

import leftArrowImage from '../../assets/left-arrow.png';
import rightArrowImage from '../../assets/right-arrow.png';

export const StudyInterface = () => {
  const [ isFlipped, setIsFlipped ] = useState(false);
  const [ currentCard, setCurrentCard ] = useState(0);

  const currentSet = handleLocalStorage.retrieveCurrentSetData();

  const [ cardIds, setCardIds ] = useState<string[]>(Object.keys(currentSet.cards));

  // Fisher-Yates shuffle
  const shuffleCards = (cardIds: string[]): string[] => {
    for (let i = cardIds.length - 1; i >= 0; i--) {
      const rand = Math.floor(Math.random() * i);
      [ cardIds[i], cardIds[rand] ] = [ cardIds[rand], cardIds[i] ];
    }
    return cardIds;
  }

  // useEffect prevents reshuffling when other states change (card flipping and changing)
  useEffect(() => {
    setCardIds(shuffleCards(Object.keys(currentSet.cards)));
  }, []);
  
  const { term, definition } = currentSet.cards[cardIds[currentCard]];
  
  const handleLeftClick = () => {
    if ( !currentCard ) { setCurrentCard(cardIds.length - 1) }
    else { setCurrentCard(currentCard - 1) }
    setIsFlipped(false);
  }
  
  const handleRightClick = () => {
    if ( currentCard >= cardIds.length - 1 ) { setCurrentCard(0) }
    else { setCurrentCard(currentCard + 1) }
    setIsFlipped(false);
  }

  return (
    <section className="study-interface-container">
      <div className="current-set-card-nav flex no-select">
        <div className="card-nav">
          <button onClick={() => handleLeftClick()}>
            <img src={leftArrowImage} alt="left_arrow" />
          </button>
          <Flashcard 
            term={term} 
            definition={definition} 
            currentCard={currentCard+1} 
            cardCount={cardIds.length} 
            isFlipped={isFlipped} 
            setIsFlipped={setIsFlipped}
          />
          <button onClick={() => {handleRightClick()}}>
            <img src={rightArrowImage} alt="right_arrow" />
          </button>
        </div>
      </div>
      <div className="current-set-data">
        <h2>{currentSet.title}</h2>
        <h3>{currentSet.description}</h3>
      </div>
    </section>
  );
}