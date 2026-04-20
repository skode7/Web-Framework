import {useUserContext} from '../hooks/contextHooks.js';

const Logout = () => {
  const {user, handleLogout} = useUserContext();
  if (!user) {
    return null;
  }
  return (
    <div>
      <p>Kirjautuneena: {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
