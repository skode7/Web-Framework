import {useUser} from '../hooks/apiHooks.js';
import useForm from '../hooks/formHooks';
import fetchData from '../utils/fetchData.js';

const RegisterForm = () => {
  const initValues = {username: '', password: '', email: ''};
  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  async function doRegister() {
    const {postUser} = useUser();
    const result = await postUser(inputs);
    console.log('user created!', result);
  }

  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label htmlFor="registerEmail">Email</label>
          <input
            name="email"
            type="email"
            id="registerEmail"
            autoComplete="email"
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="registerUser">Username</label>
          <input
            name="username"
            type="text"
            id="registerUser"
            autoComplete="username"
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </div>
        <div>
          <label htmlFor="registerPassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerPassword"
            autoComplete="current-password"
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RegisterForm;
