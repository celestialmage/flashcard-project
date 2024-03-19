import React from "react";
import Header from "./Header";
import Home from "./Home";
import DeckView from "./DeckView";
import DeckStudy from "./DeckStudy";
import NotFound from "./NotFound"; 
import DeckConfig from "./DeckConfig";
import { Routes, Route } from "react-router-dom";

function RootRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks/new" element={<DeckConfig />} />
        <Route path="/decks/:deckId/*" element={<DeckView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default RootRouter;
