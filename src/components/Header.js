import logo from '../images/mesto_logo.svg';

function Header (params) {
  return (
    <header className="header">
    <img className="header__logo" src={logo} alt="логотип место" />
  </header>
  )
}

export default Header;