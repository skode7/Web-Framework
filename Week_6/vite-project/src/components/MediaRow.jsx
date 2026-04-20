import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHooks.js';

const MediaRow = (props) => {
  const {item} = props;
  const {user} = useUserContext();
  return (
    <tr
      key={item.media_id}
      className="p-6 *:border *:border-[#ccc] *:text-center"
    >
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleDateString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>{item.username}</td>

      <td className="*:p-4 border *:border-[#ccc] *:text-center">
        <Link
          to="/single"
          state={{item}}
          className="my-2.5 block rounded-md bg-stone-500 hover:bg-stone-700 p-1.5"
        >
          Show
        </Link>
        {((user && user.username === item.username) ||
          user.username === 'admin') && (
          <>
            <button
              onClick={() => console.log('modify', item)}
              className="my-2.5 block rounded-md bg-stone-500 hover:bg-stone-700 p-1.5"
            >
              Modify
            </button>
            <button
              onClick={() => console.log('delete', item)}
              className="my-2.5 block rounded-md bg-stone-500 hover:bg-stone-700 p-1.5"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default MediaRow;
