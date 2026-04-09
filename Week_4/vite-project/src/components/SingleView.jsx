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
        <button onClick={() => setSelectedItem(null)}>close</button>
      </dialog>
    </>
  );
};
export default SingleView;
