document.addEventListener('keydown', (e) => {
  if (e.code === "Enter") {
    fetchData();
  }
});

randomize = () => {
  let rand = Math.floor(Math.random() * suggestedAnime.length);
  document.getElementById("search_query").placeholder = suggestedAnime[rand];
  fetchData();
}

async function fetchData() {
  let request = document.getElementById('search_query').value;
  if (request === '')
    request = document.getElementById("search_query").placeholder;
  document.getElementById("search_results").textContent = "Searching...";
  let aRequest = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(request)}&sfw`;
  document.getElementById('search_query').value = null;

  const data = await fetch(aRequest)
  .then(res => {
    return res.json()
  })

  const match = [];
  const maxResults = 10;
  let i = 0;
  data.data.forEach(o => {
    if (i === maxResults) {
      return;
    }
    let synmsg = "";
    if (o.synopsis == null ? synmsg = 'No synopsis found!' : synmsg = 'Synopsis: ' + o.synopsis)
    match.push(
      `<h1><a href="${o.url}" class="card">
      <div class="card__name">
        <span><font size="+1">${o.title}</span> 
      </div>
      <div class="card__image">
        <img src="${o.images.jpg.large_image_url}" height="225" width="195" background="black"/>
      </div>        
      </a>
      <div class="synopsis">
      <p><font size="-1">Rank: ${o.rank || "Unranked"} | Popularity: ${o.popularity || "Unranked"}</font></p>            
      <p><font size="-1">${synmsg}</font></p>
      </div>
      <hr />
      </h1>`
    )
    $("#search_box").html(match.join("<br />"));
    console.log(o.title);
    i++;
  });
  let msg = '';
  if (match.length === 1 ? msg = ' Result' : msg = ' Results');
  if (match.length === 0) {
    document.getElementById("search_results").textContent = 'No ' + msg + ' Found! :(';
    document.getElementById("search_box").textContent = null;
  }
  else
  document.getElementById("search_results").textContent = 'Showing ' + match.length + msg;
}
