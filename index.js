function search(sug) {
  let request = document.getElementById('search_query').value;
  if (request === '')
    request = document.getElementById("search_query").placeholder;

  let userRequest = `https://api.jikan.moe/v4/anime?q=${request}&sfw`;

  fetch(userRequest)
    .then(res => res.json())
    .then(data => {
      document.getElementById('search_query').innerHTML = userRequest;
      document.getElementById('search_query').href = userRequest;

      var results = document.getElementById('search_results');
      while (results.firstChild) { results.removeChild(results.firstChild); }
      const maxResults = 5;
      let i = 1;
      try {
        data.data.forEach(item => {
          if (i > maxResults || i == sug) {
            throw BreakException;
          }
          document.getElementById('search_results')
            .insertAdjacentHTML('beforeend',
              `
              <a href="${item.url}" class="card">
              <div class="card__image">
                  <img src="${item.images.jpg.large_image_url}" />
              </div>
              <div class="card__name">
                <span>${item.title}</span> 
              </div>
              </a>
                `
            );
          i++;
        });
      }
      catch (e) {

      }
    });
}

document.addEventListener('keydown', (e) => {
  if (e.code === "Enter") {
    search();
  }
});

function randomize() {
  let rand = Math.floor(Math.random() * suggestedAnime.length);
  document.getElementById("search_query").placeholder = 'Suggested Anime: ' + suggestedAnime[rand];
  search(2);
}
