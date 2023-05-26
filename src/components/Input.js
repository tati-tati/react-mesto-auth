function Input(props) {
  return (
    <>
      <input
        value={props.inputValue}
        className={`popup__input ${props.class}`}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        onChange={props.getInputValue}
        ref = {props.uRef}
        required
      />

      <span className="error" id={`${props.id}-error`}></span>
    </>
  );
}

export default Input;
