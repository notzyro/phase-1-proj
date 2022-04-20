// Placeholder for index.js code
function search() {
  var request = document.getElementById('search_query').value;
  
  var userRequest = `https://api.jikan.moe/v4/anime?q=${request}&sfw`;
  
  document.getElementById('search_query').innerHTML = 'Searching...';
  
  fetch(userRequest)
  .then(res => res.json())
  .then(data => {
    document.getElementById('search_query').innerHTML = 'Match found!';
    
    const maxResults = 4;
    let i = 0;
  }
}
