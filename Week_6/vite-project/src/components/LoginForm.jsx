/* eslint-disable react-hooks/rules-of-hooks */
import useForm from '../hooks/formHooks';
import {useAuthentication} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    const {postLogin} = useAuthentication();

    try {
      const loginResult = await postLogin(inputs);
      if (loginResult.token) {
        localStorage.setItem('token', loginResult.token);
        navigate('/');
      }
    } catch (error) {
      console.error({error: error});
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
