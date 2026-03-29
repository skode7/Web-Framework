const catItems = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
];

const fileNames = [];

const getAllCats = () => {
  return catItems;
};

const getCatById = (id) => {
  return catItems.find((item) => item.cat_id == id);
};

const addNewCat = (cat, filename) => {
  console.log('addnewcat:', cat);
  const {cat_name, weight, owner, birthdate} = cat;
  const newId = catItems[0].cat_id + 1;

  if (filename) {
    fileNames.push(filename);
    console.log('filename puskettu listaan!');
  }

  catItems.unshift({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return {cat_id: newId};
};

export {addNewCat, getAllCats, getCatById};
