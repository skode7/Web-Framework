import {Link} from 'react-router';

const MediaRow = (props) => {
  const {item} = props;
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
      <td>{item.username}</td>

      <td>
        <Link to="/single" state={{item}}>
          Show
        </Link>
        <button onClick={() => console.log('modify', item)}>Modify</button>
        <button onClick={() => console.log('delete', item)}>Delete</button>
      </td>
    </tr>
  );
};

export default MediaRow;
