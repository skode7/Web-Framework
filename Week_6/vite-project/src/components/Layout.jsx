import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const {user, handleAutoLogin, handleLogout} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, []);

  if (!user) {
    return (
      <div>
        <nav>
          <ul className="flex justify-end bg-[#333333] list-none *:hover:bg-black *:text-white px-4 py-2 gap-x-10 *:no-underline *:block *:text-center *:p-2">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    );
  }
  return (
    <div>
      <nav>
        <ul className="flex justify-end bg-[#333333] list-none *:hover:bg-black *:text-white px-4 py-2 gap-x-10 *:no-underline *:block *:text-center *:p-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="hover:bg-black text-white no-underline block text-center p-2"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
