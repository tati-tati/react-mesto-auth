import logo from "../images/mesto_logo.svg";
import { NavLink, Route, Routes } from "react-router-dom";

function Header(props) {
  const buttonText = { exit: "Выйти", enter: "Войти", register: "Регистрация" };
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место" />
      <div className="header__container">
        <p className="header__user-email">{props.email}</p>
        <Routes>
          <Route
            path="/"
            element={
              <NavLink to="/sign-in" className="header__link" onClick={props.handleExit}>
                {buttonText.exit}
              </NavLink>
            }
          />
          <Route
            path="/sign-in"
            element={
              <NavLink to="/sign-up" className="header__link">
                {buttonText.register}
              </NavLink>
            }
          />
          <Route
            path="/sign-up"
            element={
              <NavLink to="/sign-in" className="header__link">
                {buttonText.enter}
              </NavLink>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
