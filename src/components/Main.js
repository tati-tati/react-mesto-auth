import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button button"
          onClick={props.onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
        </button>
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__description">{currentUser.about}</p>
        <button
          className="profile__edit-button button"
          type="button"
          aria-label="Редактировать профиль"
          onClick={props.onEditProfile}
        ></button>
        <button
          className="profile__add-button button"
          type="button"
          aria-label="Добавть фото"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements" aria-label="Галерея">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              setSelectedCard={props.setSelectedCard}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
