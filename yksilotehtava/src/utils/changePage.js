const changePage = (pageId) => {
  const sections = document.querySelectorAll('section');

  sections.forEach((s) => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.classList.remove('hidden');
  }
  window.location.hash = pageId;
};
export default changePage;
