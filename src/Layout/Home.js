import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import DeckList from "./DeckList";
import "./Home.css";

function Home() {
  const [decks, setDecks] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const decksFromAPI = await listDecks();
        setDecks(decksFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }

    loadDecks();

    return () => {
      abortController.abort();
    };
  }, [update]);

  return (
    <>
      <Link to="/decks/new">
        <button> + Create Deck </button>
      </Link>

      <DeckList
        decks={decks}
        update={update}
        setUpdate={setUpdate}
        setDecks={setDecks}
      />
    </>
  );
}

export default Home;
