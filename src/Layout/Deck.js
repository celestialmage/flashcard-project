import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";
import "./Deck.css";

function Deck({ deck }) {
  async function handleDelete() {
    if (
      window.confirm(
        "Are you sure you want to delete?\nThis cannot be reversed."
      )
    ) {
      await deleteDeck(deck.id);
    }
  }

  return (
    <div className="item">
      <h3>{deck.name}</h3>
      <p>
        {deck.cards.length} {deck.cards.length !== 1 ? "cards" : "card"}
      </p>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}`}>
        <button>View</button>
      </Link>
      <Link to={`/decks/${deck.id}/study`}>
        <button>Study</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Deck;
