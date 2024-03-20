import React from "react";
import Card from "./Card";

function CardList({ cards, update, setUpdate }) {
  return (
    <div>
      {cards ? (
        cards.map((card) => <Card key={card.id} card={card} update={update} setUpdate={setUpdate} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CardList;