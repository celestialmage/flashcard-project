import React from "react";
import Card from "./Card";

function CardList({ cards }) {
  return (
    <div>
      {cards ? (
        cards.map((card) => <Card key={card.id} card={card} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CardList;