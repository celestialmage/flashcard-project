import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DeckStudy({ deck }) {
  const cards = deck.cards;
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [front, setFront] = useState(true);
  const [finished, setFinished] = useState(false);

  const handleFlip = () => {
    setFront(!front);
  };

  const handleNext = () => {
    setIndex(index + 1);
    setFront(true);
  };

  useEffect(() => {
    async function checkReset() {
      if (cards) {
        if (index + 1 === cards.length && !front) {
          setTimeout(() => {
            if (window.confirm("Would you like to restart?")) {
              setIndex(0);
              setFront(true);
            } else {
              navigate("/");
            }
          }, 5);
        }
      }
    }

    checkReset().then();
  }, [front]);

  if (cards && cards.length < 3) {
    return (
      <>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length}{" "}
          {cards.length !== 1 ? "cards" : "card"} in this deck.
        </p>
        <button>Add Cards</button>
      </>
    );
  } else if (cards) {
    return (
      <div>
        <h2>Study: {deck.name}</h2>
        <div className="item">
          <h3>
            Card {index + 1} of {cards.length}
          </h3>
          <p>{front ? cards[index].front : cards[index].back}</p>
          <button onClick={handleFlip}>Flip</button>
          {!front && <button onClick={handleNext}>Next</button>}
        </div>
      </div>
    );
  } else {
    return <p>Loading..</p>;
  }
}

export default DeckStudy;
