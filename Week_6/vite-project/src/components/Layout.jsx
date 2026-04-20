import {Link, Outlet} from 'react-router';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul className="flex justify-end bg-[#333333] list-none text-white px-4 py-2">
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
            <Link to="/login">Login</Link>
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
