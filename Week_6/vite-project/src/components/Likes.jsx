import {useEffect, useState} from 'react';
import {useLike} from '../hooks/apiHooks.js';

const Likes = ({media_id}) => {
  const [likes, setLikes] = useState(0);
  const [userLike, setUserLike] = useState(null); // store the like object
  const {getLikesCount, postLike, getUserLike, deleteLike} = useLike();
  const token = localStorage.getItem('token');

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
  }, [userLike]);

  useEffect(() => {
    const fetchUserLike = async () => {
      try {
        const userLikeResponse = await getUserLike(media_id, token);
        setUserLike(userLikeResponse);
      } catch (error) {
        console.log({error: error});
        setUserLike(null);
      }
    };

    if (token) {
      fetchUserLike();
    }
  }, [media_id, token]);

  const handleClick = async () => {
    try {
      if (userLike) {
        const deleteResult = await deleteLike(userLike.like_id, token);
        console.log(deleteResult);
        setUserLike(null);
        getLikes(); // refetch likes count
      } else {
        const postResult = await postLike(media_id, token);
        console.log(postResult);
        // refetch user like to get the like object with like_id
        const userLikeResponse = await getUserLike(media_id, token);
        setUserLike(userLikeResponse);
        getLikes(); // refetch likes count
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
