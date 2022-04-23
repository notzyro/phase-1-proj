document.addEventListener('keydown', (e) => {
  if (e.code === "Enter") {
    fetchData();
  }
});

function randomize() {
  let rand = Math.floor(Math.random() * suggestedAnime.length);
  document.getElementById("search_query").placeholder = suggestedAnime[rand];
  fetchData();
}
