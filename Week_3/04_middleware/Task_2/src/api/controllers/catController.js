import {addNewCat, getAllCats, getCatById} from '../models/catModel.js';

const getCats = (req, res) => {
  res.json(getAllCats());
};

const getCatByID = (req, res) => {
  const cat = getCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const addCat = (req, res) => {
  console.log('req.body', req.body);
  console.log('file data', req.file);
  const filename = req.file.filename;
  const result = addNewCat(req.body, filename);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = (req, res) => {
  res.json({
    message: 'Cat item deleted.',
  });
};

const putCat = (req, res) => {
  res.json({
    message: 'Cat item updated.',
  });
};

export {getCats, getCatByID, addCat, deleteCat, putCat};
