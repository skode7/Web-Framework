/**
 * Changes the active page/section by hiding all sections and showing the target one.
 * Updates the URL hash to match the page ID.
 * @param {string} pageId - The ID of the page/section to activate.
 */
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
