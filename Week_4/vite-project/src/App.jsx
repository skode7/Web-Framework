import {Route, BrowserRouter, Routes} from 'react-router';
import Profile from './views/Profile.jsx';
import Home from './views/Home.jsx';
import Upload from './views/Upload.jsx';
import Single from './views/Single.jsx';

import Layout from './components/Layout.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/single" element={<Single />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
