import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { readCard, createCard, updateCard } from "../utils/api/index";

function CardConfig() {
  const parameters = useParams();
  const { pathname } = useLocation();
  const isNew = pathname.includes("new");
  const initialFormState = {
    deckId: parameters.deckId,
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const changeHandler = ({ target }) => {
    const value = target.value;
    setFormData({ ...formData, [target.name]: value });
    // console.log(formData);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(formData);

    async function uploadCard(card, isNew) {
      if (isNew) {
        await createCard(card.deckId, card);
        // console.log(card + "createCard()");
      } else {
        await updateCard(card);
        // console.log(card + "updateCard()");
      }
    }

    uploadCard(formData, isNew);

    // console.log(formData);
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function loadCard() {
      const cardFromAPI = await readCard(parameters.cardId);
      setFormData({
        front: cardFromAPI.front,
        back: cardFromAPI.back,
        id: cardFromAPI.id,
        deckId: cardFromAPI.deckId,
      });
    }

    if (!isNew) {
      loadCard();
    }

    return () => {
      abortController.abort();
    };
  }, []); // Include parameters.cardId as dependency

  return (
    <>
      <h2>Create Card</h2>
      <form name="card" onSubmit={handleSubmit}>
        <label>Front</label>
        <textarea
          id="front"
          name="front"
          value={formData.front}
          onChange={changeHandler}
          placeholder="Front side of card"
          required
        />
        <label>Back</label>
        <textarea
          id="back"
          name="back"
          value={formData.back}
          onChange={changeHandler}
          placeholder="Back side of card"
          required
        />
        <button type="Submit">Submit</button>
        <Link to={`/decks/${parameters.deckId}`}>
          <button>Cancel</button>
        </Link>
      </form>
    </>
  );
}

export default CardConfig;
