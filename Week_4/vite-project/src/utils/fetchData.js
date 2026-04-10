const fetchData = async (filename) => {
  const data = await fetch(filename);
  return await data.json();
};

export default fetchData;
