import { useState } from "react";
import { sampleSets } from "../../data/sample_sets";
import Flashcard from "../Flashcard";

import leftArrowImage from '../../assets/left-arrow.png';
import rightArrowImage from '../../assets/right-arrow.png';

interface StudyInterfaceProps {
  set: string;
}

export const StudyInterface = ({set}: StudyInterfaceProps) => {
  const [ isFlipped, setIsFlipped ] = useState(false);
  const [ currentCard, setCurrentCard ] = useState(0);
  const { term, definition } = sampleSets[set].cards[currentCard];

  // add random card order in future
  const handleLeftClick = () => {
    if ( !currentCard ) { setCurrentCard(sampleSets[set].cards.length - 1) }
    else { setCurrentCard(currentCard - 1) }
    setIsFlipped(false);
  }
  
  const handleRightClick = () => {
    if ( currentCard >= sampleSets[set].cards.length - 1 ) { setCurrentCard(0) }
    else { setCurrentCard(currentCard + 1) }
    setIsFlipped(false);
  }

  return (
    <section className="study-interface-container flex no-select">
      <div className="card-nav">
        <button onClick={() => handleLeftClick()}>
          <img src={leftArrowImage} alt="left_arrow" />
        </button>
        <Flashcard term={term} definition={definition} isFlipped={isFlipped} setIsFlipped={setIsFlipped}/>
        <button onClick={() => {handleRightClick()}}>
          <img src={rightArrowImage} alt="right_arrow" />
        </button>
      </div>
    </section>
  );
}