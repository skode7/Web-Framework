import {useEffect, useState} from 'react';
import fetchData from '../utils/fetchData.js';

const getMedia = async () => {
  try {
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
  } catch (e) {
    console.log({error: e});
  }
};

const useMedia = (loadMedia = true) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {postFile} = useFile();

  useEffect(() => {
    const loadMediaData = async () => {
      try {
        console.log('load mediasta');
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
    if (loadMedia) {
      loadMediaData();
    }
  }, [loadMedia]);

  const postMedia = async (file, inputs, token) => {
    try {
      const fileResponse = await postFile(file, token);
      console.log('fileresponse', fileResponse.data);
      console.log('inputs', inputs);
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

  //TODO: Etsi poistettavan median filename ja välitä se parametrina allaolevalle funktiolle!

  const deleteMedia = async (id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${id}`,
      fetchOptions,
    );
    return result;
  };

  const modifyMedia = async (id, inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputs),
    };
    const result = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${id}`,
      fetchOptions,
    );
    return result;
  };

  return {mediaArray, postMedia, deleteMedia, modifyMedia};
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
