import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const item = state.item;
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <>
      <dialog open={item !== null} className="modal">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {item.media_type.includes('video') ? (
          <video controls src={item.filename} />
        ) : (
          <img src={item.filename} />
        )}
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
