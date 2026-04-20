import {Route, BrowserRouter, Routes} from 'react-router';
import Profile from './views/Profile.jsx';
import Home from './views/Home.jsx';
import Upload from './views/Upload.jsx';
import Single from './views/Single.jsx';
import Login from './views/Login.jsx';
import Layout from './components/Layout.jsx';
import {UserProvider} from './contexts/UserContext.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <UserProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/single" element={<Single />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};
export default App;
