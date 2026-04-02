import {
  addNewCat,
  getAllCats,
  getCatById,
  modifyCat,
  removeCat,
} from '../models/catModel.js';

const getCats = async (req, res) => {
  const result = await getAllCats();
  const owners = result.map((cat) => cat.owner);

  res.json({owners: owners});
};

const getCatByID = async (req, res) => {
  const cat = await getCatById(req.params.id);
  if (cat) {
    res.json({owner: cat.owner});
  } else {
    res.sendStatus(404);
  }
};

const addCat = async (req, res) => {
  const result = await addNewCat(req.body, req.file.filename);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = async (req, res) => {
  res.json(await removeCat(req.params.id));
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  res.json(result);
};

export {getCats, getCatByID, addCat, deleteCat, putCat};
