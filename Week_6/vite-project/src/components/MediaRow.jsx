import {Link} from 'react-router';
import {useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks.js';
import {useMedia} from '../hooks/apiHooks.js';
import Likes from './Likes.jsx';

const MediaRow = (props) => {
  const {item} = props;
  const {user} = useUserContext();
  const {deleteMedia} = useMedia(false);
  const navigate = useNavigate();

  const deleteItem = async () => {
    try {
      if (confirm('Poistetaanko', item.title, '?')) {
        const token = localStorage.getItem('token');
        await deleteMedia(item.media_id, token);
        alert(item.title + ' poistettu!');
        navigate(0);
      }
    } catch (error) {
      console.log({error: error});
    }
  };

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
        {((user && user?.username === item?.username) ||
          user?.username === 'admin') && (
          <>
            <button className="my-2.5 block rounded-md bg-stone-500 hover:bg-stone-700 p-1.5">
              <Link to="/modify" state={{item}}>
                Modify
              </Link>
            </button>
            <button
              onClick={deleteItem}
              className="flex my-2.5 rounded-md bg-stone-500 hover:bg-stone-700 p-1.5"
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
