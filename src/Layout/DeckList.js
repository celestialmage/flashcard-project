import React from "react";
import Deck from "./Deck";

function DeckList({ decks, update, setUpdate }) {
  return (
    <div>
      {decks ? (
        decks.map((deck) => <Deck update={update} setUpdate={setUpdate} key={deck.id} deck={deck} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DeckList;
