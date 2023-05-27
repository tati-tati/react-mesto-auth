import { Link } from "react-router-dom";
import logo from "../images/mesto_logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место" />
      <Link to="/sign-in" className="header__link">Войти</Link>
    </header>
  );
}

export default Header;
