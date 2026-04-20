/* eslint-disable react-hooks/rules-of-hooks */
import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs);
    } catch (error) {
      alert(error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={(event) => {
              handleInputChange(event);
            }}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={(event) => {
              handleInputChange(event);
            }}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default LoginForm;
