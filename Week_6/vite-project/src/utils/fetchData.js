const fetchData = async (url, options) => {
  const data = await fetch(url, options);
  return await data.json();
};

export default fetchData;
