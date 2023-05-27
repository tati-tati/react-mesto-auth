import { useState } from "react";

function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleInputPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmitAuth (evt) {
    evt.preventDefault();
    props.handleSubmit({ password, email })
  }

  return (
    <div className="auth">
      <form
        className="auth__form"
        name="login"
        onSubmit={handleSubmitAuth}
      >
        <h2 className="auth__title">{props.title}</h2>
        <input
          className="auth__input"
          placeholder="Email"
          type="email"
          onChange={handleInputEmail}
        />
        <input
          className="auth__input"
          placeholder="Пароль"
          type="password"
          onChange={handleInputPassword}
        />
        <button className="auth__button button" type="submit">
          {props.buttonText}
        </button>
        {props.children}
      </form>
    </div>
  );
}

export default AuthForm;
