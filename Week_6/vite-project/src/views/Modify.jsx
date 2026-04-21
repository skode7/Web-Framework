import {useMedia} from '../hooks/apiHooks';

import {useLocation, useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';

const Modify = () => {
  const {state} = useLocation();
  const {modifyMedia} = useMedia(false);
  const navigate = useNavigate();
  const {item} = state;
  const initValues = {
    title: item.title,
    description: item.description,
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doModify,
    initValues,
  );

  async function doModify() {
    try {
      const token = localStorage.getItem('token');
      await modifyMedia(item.media_id, inputs, token);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      <h1>Modify</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          >
            {inputs.description}
          </textarea>
        </div>
        <button
          type="submit"
          disabled={inputs.title?.length > 3 ? false : true}
        >
          Modify
        </button>
      </form>
    </>
  );
};

export default Modify;
