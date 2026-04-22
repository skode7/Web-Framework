import {useEffect, useState} from 'react';
import {useLike} from '../hooks/apiHooks.js';

const Likes = ({media_id}) => {
  const [likes, setLikes] = useState(0);
  const [userLike, setUserLike] = useState(null); // store the like object
  const {getLikesCount, postLike, getUserLike, deleteLike} = useLike();
  const token = localStorage.getItem('token');
  const [updateLike, setUpdateLike] = useState(false);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await getLikesCount(media_id);
        setLikes(response.count);
      } catch (error) {
        console.log({error: error});
      }
    };
    getLikes();
  }, [updateLike, media_id, getLikesCount]);

  useEffect(() => {
    const fetchUserLike = async () => {
      try {
        if (!token) {
          return;
        }
        const userLikeResponse = await getUserLike(media_id, token);

        if (
          userLikeResponse &&
          userLikeResponse.like_id &&
          !userLikeResponse.message
        ) {
          setUserLike(userLikeResponse);
        } else {
          setUserLike(null);
        }
      } catch (e) {
        setUserLike(null);
      }
    };

    fetchUserLike();
  }, [updateLike, media_id, token]);

  console.log('userLike', userLike);

  const handleClick = async () => {
    try {
      if (userLike) {
        const deleteResult = await deleteLike(userLike.like_id, token);
        console.log('deleteResult:', deleteResult);
        setUserLike(null);
        setUpdateLike((prev) => !prev);
      } else {
        await postLike(media_id, token);
        setUpdateLike((prev) => !prev);
      }
    } catch (error) {
      console.log({error: error});
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex my-2.5 rounded-md p-1.5 ${
        userLike
          ? 'bg-red-500 hover:bg-red-700'
          : 'bg-stone-500 hover:bg-stone-700'
      }`}
    >
      {userLike ? 'Unlike' : 'Like'} {likes}
    </button>
  );
};

export default Likes;
