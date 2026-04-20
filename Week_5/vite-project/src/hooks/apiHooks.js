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
  const {postFile} = useFile();

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

  const postMedia = async (file, inputs, token) => {
    try {
      const fileResponse = await postFile(file, token);
      const mediaItem = {
        title: inputs.title,
        description: inputs.description,
        filename: fileResponse.data.filename,
        media_type: fileResponse.data.media_type,
        filesize: fileResponse.data.filesize,
      };

      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(mediaItem),
      };
      const mediaResponse = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
        fetchOptions,
      );
      return mediaResponse;
    } catch (e) {
      console.error(e);
    }
  };
  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const loginResult = await fetchData(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        fetchOptions,
      );
      return loginResult;
    } catch (error) {
      console.error({error: error});
    }
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const userInfo = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
    return userInfo;
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    try {
      const dataJson = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users',
        fetchOptions,
      );
      return dataJson;
    } catch (error) {
      console.error({error: error});
    }
  };
  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const fetchOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      };
      const result = await fetchData(
        import.meta.env.VITE_UPLOAD_SERVER + '/upload',
        fetchOptions,
      );
      console.log(result.data);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  };
  return {postFile};
};

export {useAuthentication, useMedia, useUser, useFile};
