import Likes from '../components/Likes';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;

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
          onClick={() => setSelectedItem(null)}
          className="my-2.5 block rounded-md bg-stone-500 hover:bg-stone-700 p-1.5"
        >
          close
        </button>
      </dialog>
    </>
  );
};
export default SingleView;
