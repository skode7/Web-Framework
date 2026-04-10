const fetchData = async (url) => {
  const data = await fetch(url);
  return await data.json();
};

export default fetchData;
