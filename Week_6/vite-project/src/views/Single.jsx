import {useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks.js';
import Likes from '../components/Likes';

const Single = () => {
  const {state} = useLocation();
  const item = state?.item;
  const dialogRef = useRef();
  const navigate = useNavigate();
  const {user} = useUserContext();

  useEffect(() => {
    if (item && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [item]);

  if (!item) return null;

  return (
    <>
      <dialog ref={dialogRef} className="modal">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {item.media_type.includes('video') ? (
          <video controls src={item.filename} />
        ) : (
          <img src={item.filename} />
        )}
        {user && <Likes media_id={item.media_id} />}

        <button
          onClick={() => navigate(-1)}
          className="my-2.5 block rounded-md bg-stone-500 hover:bg-stone-700 p-1.5"
        >
          Go back
        </button>
      </dialog>
    </>
  );
};

export default Single;
