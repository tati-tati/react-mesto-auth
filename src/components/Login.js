import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      handleSubmit={props.handleLogInSubmit}
    />
  );
}

export default Login;
