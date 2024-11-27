let movieList = [
  {
    index: 1,
    title: "Furiosa",
    description: "The origin story of renegade warrior Furiosa before her encounter and team up with Mad Max.",
    link: "https://www.imdb.com/title/tt12037194/?ref_=ls_t_2",
    image: "images/film 1.jpg",
    rate: "8.2",
    watchCount: "21500",
    genre: "Action"
  },
  {
    index: 2,
    title: "Dune",
    description: "Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    link: "https://www.imdb.com/title/tt15239678/?ref_=ls_t_1",
    image: "images/film 2.jpg",
    rate: "8.2",
    watchCount: "76500",
    genre: "Action"
  },
  {
    index: 3,
    title: "The Fall Guy",
    description: "A stuntman, fresh off an almost career-ending accident, has to track down a missing movie star.",
    link: "https://www.imdb.com/title/tt1684562/?ref_=ls_t_11",
    image: "images/film 3.jpg",
    rate: "8.2",
    watchCount: "11500",
    genre: "Thriller"
  },
  {
    index: 4,
    title: "The Wild Bot",
    description: "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island.",
    link: "https://www.imdb.com/title/tt29623480/",
    image: "images/film 4.avif",
    rate: "8.2",
    watchCount: "23400",
    genre: "Anime"
  },
];

let filmNames = [];
let filmRate = [];
let filmWatchCount = [];
let filmGenre = [];

let latestMovieRow = document.getElementById("latestMovieRow");
let cardBody = ``;

movieList.forEach((element, index) => {
  filmNames.push(element.title);
  filmRate.push(element.rate);
  filmWatchCount.push(element.watchCount);
  filmGenre.push(element.genre);

  cardBody +=
    `<div class="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div class="card" style="width: 18rem;">
        <img src="${element.image}" class="card-img-top" alt="${element.title}">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.description}</p>
          <a href="${element.link}" class="btn btn-dark">IMDB</a>
          <input type="button" class="btn btn-dark" value="Add to WatchList" onclick="addWatchlist(${element.index})">
        </div>
      </div>
    </div>`;
});

latestMovieRow.innerHTML = cardBody;

let watchListArray = [];
let divWatchlist = document.getElementById("divWatchlist");

function addWatchlist(indexa) {
  let movieExists = watchListArray.some(element => element.index === indexa);
  
  if (movieExists) {
    console.log("Movie already in watchlist.");
    return;
  }
  let movie = movieList.find(element => element.index === indexa);
  
  if (movie) {
    watchListArray.push(movie);
  }
  printWatchlist();
}

function removeWatchlist(indexa) {
  const movieIndex = watchListArray.findIndex(element => element.index === indexa);
  
  if (movieIndex !== -1) {
    watchListArray.splice(movieIndex, 1);
  }

  printWatchlist();
}

function printWatchlist() {
  let watchListBody = "";
  watchListArray.forEach(element => {
    watchListBody += 
    `<div class="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div class="card" style="width: 18rem;">
        <img src="${element.image}" class="card-img-top" alt="${element.title}">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.description}</p>
          <a href="${element.link}" class="btn btn-dark">IMDB</a>
          <input type="button" class="btn btn-dark" value="Remove WatchList" onclick="removeWatchlist(${element.index})">
        </div>
      </div>
    </div>`;
  });

  divWatchlist.innerHTML = watchListBody;
}



// --------------- Radar Chart ------------------
const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: filmNames,
    datasets: [{
      label: 'Color Votes',
      data: filmWatchCount,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      r: {
        beginAtZero: true
      }
    }
  }
});

// --------------- Line Chart ------------------
const ctx2 = document.getElementById('myChart2');
new Chart(ctx2, {
  type: 'line',
  data: {
    labels: filmGenre,
    datasets: [{
      label: '# of Votes',
      data: filmWatchCount,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// --------------- Pie Chart ------------------
const ctx3 = document.getElementById('myChart3');
new Chart(ctx3, {
  type: 'pie',
  data: {
    labels: filmNames,
    datasets: [{
      label: '# of Votes',
      data: filmRate,
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});