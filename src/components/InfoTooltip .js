function InfoTooltip(props) {
  // console.log(props.message);
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
        <div
          className={`${
            props.status ? "popup__access-img" : "popup__reject-img"
          }`}
        />
        <h2 className="popup__access-sub">{props.message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
