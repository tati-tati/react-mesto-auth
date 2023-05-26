function ImagePopup(props) {
  return (
    <div
      className={`popup popup_show_picture ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__preview">
        <button
          className="popup__close-button button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className="popup__subtitle">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
