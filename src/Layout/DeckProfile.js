import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";
import CardList from "./CardList";

function DeckProfile({ deck, update, setUpdate }) {

  const navigate = useNavigate();

  async function handleDelete() {
    if (
      window.confirm(
        "Are you sure you want to delete?\nThis cannot be reversed."
      )
    ) {
      await deleteDeck(deck.id);
      navigate("/");
    }
  }

  return (
    <>
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button>Study</button>
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button>Add Cards</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>
        <h2>Cards</h2>
        <CardList cards={deck.cards} update={update} setUpdate={setUpdate} />
      </div>
    </>
  );
}

export default DeckProfile;
