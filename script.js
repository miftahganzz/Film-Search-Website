    function showLoading() {
      const searchButton = document.getElementById('searchButton');
      const loadingSpinner = document.getElementById('loadingSpinner');
      searchButton.disabled = true;
      searchButton.style.cursor = 'not-allowed';
      document.getElementById('searchText').style.display = 'none';
      loadingSpinner.style.display = 'inline-block';
    }

    function hideLoading() {
      const searchButton = document.getElementById('searchButton');
      const loadingSpinner = document.getElementById('loadingSpinner');
      searchButton.disabled = false;
      searchButton.style.cursor = 'pointer';
      document.getElementById('searchText').style.display = 'inline';
      loadingSpinner.style.display = 'none';
    }

    function searchMovies(query) {
      if (!query) {
        alert('Please enter a movie name before searching.');
        return;
      }
      
      showLoading();

      fetch(`https://api.yanzbotz.my.id/api/movie/layarkaca21?query=${query}`)
        .then(response => response.json())
        .then(data => {
          const movieResults = document.getElementById('movieResults');
          movieResults.innerHTML = '';

          data.result.forEach(movie => {
            const categories = movie.categories.map(category => `<span class="category-capsule">${category}</span>`).join(', ');
            const card = `
                            <div class="col-3">
                                <div class="card">
                                    <img src="${movie.posterImage}" class="card-img-top" alt="${movie.title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${movie.title}</h5>
                                        <p class="card-text">Director: ${movie.directors[0]}</p>
                                        <p class="card-text">Cast: ${movie.cast.join(', ')}</p>
                                        <p class="card-text">Categories: ${categories}</p>
                                        <a href="${movie.movieLink}" class="btn btn-primary btn-block">Detail</a>
                                    </div>
                                </div>
                            </div>
                        `;
            movieResults.innerHTML += card;
          });

          hideLoading();
        })
        .catch(error => console.error(error));
    }

    document.getElementById('searchButton').addEventListener('click', () => {
      const searchInput = document.getElementById('searchInput');
      const query = searchInput.value;
      searchMovies(query);
    });

    document.getElementById('searchInput').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value;
        searchMovies(query);
      }
    });
