const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const bookTickets = document.querySelector(".book");
const refreshPage = document.querySelector(".refresh");

populateUI();

let ticketPrice = parseInt(movieSelect.value);
//changes value from string to number
//alternatively you can just write +movieSelect.value
//console.log(typeof ticketPrice);

//Functions
//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Update Total & Count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //Store Seat Selection
  //1. Copy selected seat values from node list into an array with spread operator
  //2. Map through array & return index of selected seats
  //3. Return a new array of indexes
  const seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat);
  });

  //Store values from array in local storage
  //JSON.stringify is required because seatsIndex is an array & we need a string
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  //see 'movie select event' below for more

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data about seat selection from local storage and populate UI
//JSON.parse does the opposite of JSON.stringify
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //First check if there is any data in local storage & not an empty array
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      //if there is data there
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Event Listeners
//Movie Select Event
movieSelect.addEventListener("change", function(event) {
  ticketPrice = parseInt(event.target.value);

  //save selected movie title position (selectedIndex) &price (target.value) to local storage
  setMovieData(event.target.selectedIndex, event.target.value);

  updateSelectedCount();
});

//Seat Click Event
container.addEventListener("click", function(event) {
  //console.log(event.target);
  //shows exact element that is clicked on in the page
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
    //only allows us to choose divs with class "seat", but not the class of occupied
  ) {
    event.target.classList.toggle("selected");
    //Changes seat to blue when selected & back when clicked again

    updateSelectedCount();
  }
});

//Book tickets event
bookTickets.addEventListener("click", function(event) {
  alert(
    "Sorry, we are in a global quarantine. Tickets cannot be booked at this time."
  );
});

//Refresh Page event
refreshPage.addEventListener("click", function(event) {
  localStorage.clear();
  window.location.reload();
});

//Initial count and total set
updateSelectedCount();

//Made by Cybero 2020
