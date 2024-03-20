import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

function Card({ card, update, setUpdate }) {
  async function handleDelete() {
    if (
      window.confirm(
        "Are you sure you want to delete?\nThis cannot be reversed."
      )
    ) {
      await deleteCard(card.id);
      setUpdate(!update);
    }
  }

  const parameters = useParams();

  return (
    <div className="cards">
      <div className="group">
        <div className="items">{card.front}</div>
        <div className="items">{card.back}</div>
      </div>
      <div>
        <Link to={`/decks/${parameters.deckId}/cards/${card.id}/edit`}><button>Edit</button></Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Card;
