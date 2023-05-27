import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register() {
  return (
    <AuthForm title="Регистрация" buttonText="Зарегистрироваться">
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  );
}

export default Register;
