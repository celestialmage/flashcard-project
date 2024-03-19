import React from "react";
import Deck from "./Deck";

function DeckList({ decks }) {
  return (
    <div>
      {decks ? (
        decks.map((deck) => <Deck key={deck.id} deck={deck} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DeckList;
