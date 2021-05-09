const API_KEY = 'api_key=d44266f7adf2faa188227fb9a9d687db';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        /* console.log(data.results); */
        showMovies(data.results);
    })
}


function showMovies(data) {

    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img class="movie-img" src="${IMG_URL + poster_path}" alt="${title}">

        <div class="movie-title">
            <h3>${title}</h3>
        </div>

        <div class="overview">
            ${overview}
        </div>

        <a class="movie-button" id="watch">WATCH</a> </div>
        `

        main.appendChild(movieEl);
    });
};

