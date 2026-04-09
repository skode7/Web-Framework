const MediaRow = (props) => {
  const {item, setSelectedItem} = props;
  return (
    <tr key={item.media_id}>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleDateString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <button
        type="button"
        onClick={() => {
          console.log('buttonia klikattu!');
          setSelectedItem(item);
        }}
      >
        Show media
      </button>
    </tr>
  );
};

export default MediaRow;
