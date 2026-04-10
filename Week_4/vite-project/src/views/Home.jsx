import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import PropTypes from 'prop-types';
import Single from './Single.jsx';
import fetchData from '../utils/fetchData.js';

const getMedia = async () => {
  try {
    return await fetchData('test.json');
  } catch (e) {
    console.log({error: e});
  }
};

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      const data = await getMedia();
      setMediaArray(data);
    };
    loadMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
      {selectedItem && <Single item={selectedItem} />}
    </>
  );
};

Home.proptypes = {
  media_id: PropTypes.number,
  user_id: PropTypes.number,
  filename: PropTypes.string,
  thumbnail: PropTypes.string,
  filesize: PropTypes.number,
  media_type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.string,
};
export default Home;
