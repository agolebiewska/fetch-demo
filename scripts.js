window.onload = function() {
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  
  function toggleLoader() {
    const loader = document.querySelector('.loading');
    loader.classList.toggle('hide');
  }

  function showError(error) {
    console.log(error.message);
  }

  function parseResponseAsJSON(response) {
    return response.json();
  }

  function getTvEpisodes(data) {
    return data;
  }

  function createElement(data) {
    const show = data.show;
    
    const content = document.querySelector('.content');
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const img = document.createElement('img');
    const divDescription = document.createElement('div');
    
    div.classList.add('episode');
    divDescription.classList.add('description');
    
    divDescription.style.height = '120px';
    divDescription.style.overflow = 'scroll';
  
    h1.innerText = show.name;
    div.appendChild(h1);
    
    img.src = show.image ? show.image.medium : './img/no-image-slide.png';
    div.appendChild(img);
    
    divDescription.innerHTML = show.summary;
    div.appendChild(divDescription);

    content.appendChild(div);
  }

  function showEpisodes(episodes) {
    toggleLoader();
    episodes.forEach(createElement);
  }

  function clearContent() {
    const content = document.querySelector('.content');
    content.innerHTML = '';
  }
  
  function search(event) {
    event.preventDefault();
    clearContent();
    toggleLoader();
    const query = event.target.elements[0].value;
    const apiURL = `https://api.tvmaze.com/search/shows?q=${query}`;

    fetch(apiURL)
      .then(parseResponseAsJSON)
      .then(getTvEpisodes)
      .then(showEpisodes)
      .catch(showError);
  }

  form.addEventListener('submit', search);
  input.addEventListener('click', function(event) {
    event.target.value = '';
  });
}