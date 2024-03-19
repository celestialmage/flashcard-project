import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Nav from "./Nav";
import DeckProfile from "./DeckProfile";
import DeckStudy from "./DeckStudy";
import DeckConfig from "./DeckConfig";
import CardConfig from "./CardConfig";
import "./DeckView.css";

function DeckView() {
  const parameters = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    setDeck({});
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const deckFromAPI = await readDeck(parameters.deckId);
        await setDeck(deckFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }

    loadDeck();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Nav deck={deck} />
      <Routes>
        <Route path="/" element={<DeckProfile deck={deck} />} />
        <Route path="study" element={<DeckStudy deck={deck} />} />
        <Route
          path="/edit"
          element={
            <DeckConfig name={deck.name} description={deck.description} />
          }
        />
        <Route path="cards/:cardId/edit/*" element={<CardConfig />} />
        <Route path="cards/new" element={<CardConfig />} />
      </Routes>
    </>
  );
}

export default DeckView;
