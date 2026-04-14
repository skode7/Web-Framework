import {useEffect, useState} from 'react';
import fetchData from '../utils/fetchData.js';

const getMedia = async () => {
  try {
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
  } catch (e) {
    console.log({error: e});
  }
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const data = await getMedia();
        const mediaWithUsernames = await Promise.all(
          data.map(async (item) => {
            const result = await fetchData(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
            );
            return {...item, username: result.username};
          }),
        );
        setMediaArray(mediaWithUsernames);
      } catch (e) {
        console.log({error: e});
      }
    };
    loadMedia();
  }, []);

  return {mediaArray};
};

export default useMedia;
