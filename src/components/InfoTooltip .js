function InfoTooltip (props) {
  return(
    <div
    className={`popup ${props.class} ${props.isOpen ? "popup_opened" : ""}`}

    >
            <div className="popup__container">

        <button
          className="popup__close-button button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <div
          className="popup__access-img popup__access-img_accepted"
        />
        <h2 className="popup__access-sub">Вы успешно зарегистрировались!</h2>
        </div>
    </div>
  )
}

export default InfoTooltip;