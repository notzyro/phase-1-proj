// Placeholder for index.js code
function search() {
  var request = document.getElementById('search_query').value; 
  var userRequest = `https://api.jikan.moe/v4/anime?q=${request}&sfw`;  

  fetch(userRequest)
    .then(res => res.json())
    .then(data => {
      document.getElementById('search_query').innerHTML = userRequest;
      document.getElementById('search_query').href = userRequest;

      var results = document.getElementById('search_results');
      while (results.firstChild) {results.removeChild(results.firstChild);}

      const maxResults = 10;
      let i = 1;
      try {
        data.data.forEach(item => {
          if (i > maxResults) {
            throw BreakException;
          }

          document.getElementById('search_results')
            .insertAdjacentHTML(
              'beforeend',
              `
                <a href="${item.url}" class="card">
                    <div class="card__image">
                        <img src="${item.images.jpg.small_image_url}" alt="${item.title}" />
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
document.getElementById('search_query').onkeydown = (event) => {
  if (event === 13) {
      search();
  }
};
