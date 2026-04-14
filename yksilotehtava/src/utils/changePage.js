const changePage = (pageId) => {
  const sections = document.querySelectorAll('section');

  sections.forEach((s) => {
    s.classList.remove('active');
  });
  const target = document.getElementById(pageId);
  target.classList.add('active');
  window.location.hash = pageId;
};
export default changePage;
