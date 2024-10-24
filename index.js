const API_KEY = "2be64e59";

async function fetchData(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
        const data = await response.json();
        if (data.Response === "False") {
            alert("Фильм не найден: " + data.Error);
            return null;
        }
        return data;
    } catch (error) {
        console.error("Ошибка при запросе данных:", error);
        alert("Произошла ошибка при запросе данных.");
        return null;
    }
}

document.getElementById('movie-search-button').addEventListener('click', async () => {
    const movieTitleValue = document.getElementById('movie-search-input').value.trim();
    if (!movieTitleValue) {
        alert("Пожалуйста, введите название фильма.");
        return;
    }


    const spinner = document.getElementById('spinner');
    const movieResults = document.querySelector('.search-results');

    // Показать спиннер перед началом поиска
    spinner.style.display = 'block';
    movieResults.innerHTML = '';

    const movie = await fetchData(movieTitleValue);

    // Скрыть спиннер после завершения поиска
    spinner.style.display = 'none';

   
    if (!movie) return;


   


   

    const cardElementTemplate = `
        <div class="card" style="width: 18rem;">
            <img
                src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}"
                class="card-img-top"
                alt="${movie.Title} movie poster"
            />
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Plot}</p>
                
                <button
                    class="btn btn-primary"
                    data-movie-title="${movie.Title}"
                    data-movie-poster="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}"
                    data-movie-plot="${movie.Plot}"
                    data-movie-year="${movie.Year}"
                    data-movie-genre="${movie.Genre}"
                    data-movie-actors="${movie.Actors}"
                >
                    Подробнее
                </button>
            </div>
        </div>`;

    document.querySelector('.search-results').innerHTML = cardElementTemplate;

    document.querySelector('.btn-primary').addEventListener('click', function () {
        const title = this.getAttribute('data-movie-title');
        const poster = this.getAttribute('data-movie-poster');
        const plot = this.getAttribute('data-movie-plot');
        const year = this.getAttribute('data-movie-year');
        const genre = this.getAttribute('data-movie-genre');
        const actors = this.getAttribute('data-movie-actors');
        showModal(title, poster, plot, year, genre, actors);
    });

    showToast("success");
});


function showModal(title, poster, plot, year, genre, actors) {
    document.querySelector('#exampleModalLabel').textContent = title;
    document.querySelector('#modalMoviePoster').src = poster;
    document.querySelector('#modalMoviePoster').alt = `${title} movie poster`;
    document.querySelector('#modalMovieYear').textContent = year;
    document.querySelector('#modalMovieGenre').textContent = genre;
    document.querySelector('#modalMovieActors').textContent = actors;
    document.querySelector('#modalMovieDescription').textContent = plot;

    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

}


function showToast(type) {
    const toastSuccess = new bootstrap.Toast(document.getElementById('toastSuccess'));
    const toastError = new bootstrap.Toast(document.getElementById('toastError'));

    if (type === "success") {
        toastSuccess.show();
    } else if (type === "error") {
        toastError.show();
    }
}



/*localStorage.setItem('myBirthdate', '11.03.1999')

const phoneNumbers = ['998990008877', '76543332211']
localStorage.setItem('phoneNumbers', phoneNumbers)


const myData = {
    age: 25,
    sex: 'male',
    pets: ['Freya']
}

localStorage.setItem('myData', JSON.stringify(myData))

let myDAtaJSON = localStorage.getItem ('myData')
let myDAta = JSON.parse(myDAtaJSON)
myData.pets[0]*/
    