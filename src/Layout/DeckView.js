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
  const [update, setUpdate] = useState(false);

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
    console.log(update);

    return () => {
      abortController.abort();
    };
  }, [update]);

  return (
    <>
      <Nav deck={deck} />
      <Routes>
        <Route
          path="/"
          element={
            <DeckProfile deck={deck} update={update} setUpdate={setUpdate} />
          }
        />
        <Route path="study" element={<DeckStudy deck={deck} />} />
        <Route
          path="/edit"
          element={
            <DeckConfig name={deck.name} description={deck.description} />
          }
        />
        <Route
          path="cards/:cardId/edit/*"
          element={<CardConfig update={update} setUpdate={setUpdate} />}
        />
        <Route
          path="cards/new"
          element={<CardConfig update={update} setUpdate={setUpdate} />}
        />
      </Routes>
    </>
  );
}

export default DeckView;
