import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Nav from "./Nav";
import { updateDeck, createDeck, readDeck } from "../utils/api/index";

function DeckConfig() {
  const parameters = useParams();
  const isNew = useLocation().pathname.includes("new");
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  async function handleChange({ target }) {
    const value = target.value;
    setFormData({ ...formData, [target.name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isNew) {
      await createDeck(formData);
    } else {
      await updateDeck(formData);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const { name, description, id } = await readDeck(
        parameters.deckId,
        abortController
      );

      setFormData({ name: name, description: description, id: id});
    }

    if (!isNew) {
      loadDeck();
    }

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {isNew && <Nav deck={{ name: "New" }} />}
      {formData ? (
        <>
          <h2>{isNew ? "Create Deck" : "Edit Deck"}</h2>
          <form name="deck" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              placeholder="Deck Name"
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the deck"
              required
            />
            <button type="submit">Submit</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default DeckConfig;
