function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.class} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <form
          onSubmit={props.onSubmit}
          className={`popup__form popup__${props.form}`}
          action="#"
          name={props.form}
        >
          <h2 className={`popup__title ${props.titleModificator}`}>
            {props.title}
          </h2>
          {props.children}
          <button
            className={`popup__save-button button ${props.buttonModificator}`}
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
