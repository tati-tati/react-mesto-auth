function AuthForm(props) {
  return (
    <div className="auth">
      <form className="auth__form" name="login">
        <h2 className="auth__title">{props.title}</h2>
        <input className="auth__input" placeholder="Email" type="email" />
        <input className="auth__input" placeholder="Пароль" type="password" />
        <button className="auth__button button" type="submit">
          {props.buttonText}
        </button>
        {props.children}
      </form>
    </div>
  );
}

export default AuthForm;