import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Nav.css";

function Nav({ deck }) {
  const currentURL = useLocation();
  const parameters = useParams();
  let pageName;

  if (currentURL.pathname.includes("study")) {
    pageName = "Study";
  } else if (
    currentURL.pathname.includes("edit") &&
    currentURL.pathname.includes("card")
  ) {
    const string = parameters["*"].split("/");
    pageName = `Edit Card ${string[1]}`;
  } else if (currentURL.pathname.includes("edit")) {
    pageName = "Edit";
  } else if (currentURL.pathname.includes("cards/new")) {
    pageName = "Add Card";
  }

  return (
    <div className="nav">
      {deck ? (
        <>
          <Link to="/">Home</Link>
          {pageName ? (
            <>
              <span> / </span>
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </>
          ) : (
            <span> / {deck.name} </span>
          )}
          {pageName && (
            <>
              <span> / </span>
              <span>{pageName}</span>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Nav;
