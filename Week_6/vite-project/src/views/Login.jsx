import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {useState} from 'react';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="login-container">
      {showLogin ? <LoginForm /> : <RegisterForm />}

      <hr />

      <p>
        {showLogin ? 'Eikö sinulla ole vielä tiliä?' : 'Onko sinulla jo tili?'}
        <button
          onClick={toggleForm}
          style={{marginLeft: '10px'}}
          className="my-2.5 block w-1/5 rounded-md bg-stone-500 hover:bg-stone-700 p-1.5"
        >
          {showLogin ? 'Rekisteröidy tästä' : 'Kirjaudu tästä'}
        </button>
      </p>
    </div>
  );
};

export default Login;
