import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from "react";


function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `elements__like-button button ${isLiked && 'elements__like-button_active'}` 
  );;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick () {
    props.onCardDelete(props.card);
  }

  function handleCardClick () {
    props.setSelectedCard(props.card);
  }

  return (
    <article className="elements__element">
      {isOwn && 
      <button className="elements__delete-button button"
      type="button"
      aria-label="Удалить"
 onClick={handleDeleteClick} />
 } 

      <img className="elements__image" src={props.card.link} alt={props.card.name} 
      onClick={handleCardClick} />
      <h2 className="elements__title">{props.card.name}</h2>
      <button
        className={cardLikeButtonClassName}
        type="button"
        aria-label="Поставить лайк"
        onClick={handleLikeClick}
      ></button>
      <p className="elements__like-number">{props.card.likes.length}</p>
    </article>
  );
}

export default Card;
