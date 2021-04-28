const rows = document.querySelectorAll(".rows");
const costTotal = document.querySelector(".costTotal");
// Select seats total
let seatTotal = document.querySelector(".seatTotal");
let seatId = document.querySelector(".seatId");
// Select button
const btnBuy = document.querySelector(".btnBuy");
// Select movie selector
let movie = document.getElementById("movie");
// Select seats
const seats = document.querySelectorAll(".seat:not(.occupied)");
// Global Variables
let removeSeat = false;
let seatRow = 0;
let seatNumber = 0;

// Select rows number and set the innerHtml value
let rowNumb = document.querySelectorAll(".rowNumb");
rowNumb.forEach(element => {
  element.innerHTML = `Fila ${element.id}`;
});

//******************* UPDATE VALUES FUNCTION */
const updateValues = (seatNumber, seatRow, removeSeat) => {
  // Select seats with class 'selected'
  let seatSelected = document.querySelectorAll(".row .seat.selected");

  // Create array for localstorage
  let localStorageSeats = [...seatSelected].map(seat => {
    return [...seats].indexOf(seat);
  });
  // Save seats selected inside browser localstorage
  localStorage.setItem("poltrone", JSON.stringify(localStorageSeats));

  // Populate info area
  if (seatNumber && seatRow !== undefined) {
    if (!removeSeat) {
        seatId.innerHTML += ` ${seatNumber}/${seatRow} -`;
      // Save value inside browser local storage
      localStorage.setItem("N&&L", seatId.innerHTML);
    } else {
        seatId.innerHTML = seatId.innerHTML.replace(
        ` ${seatNumber}/${seatRow} -`,
        ""
      );
      // Save value inside browser local storage
      localStorage.setItem("N&&L", seatId.innerHTML);
    }
  }
  // Set ticket price
  let ticket = movie.value;
  // Seats total number
  seatTotal.innerHTML = seatSelected.length;
  // Price
  costTotal.innerHTML = seatSelected.length * ticket;
};

//************ Load data from browser local storage */
let seatsNotSelected = document.querySelectorAll(".seat:not(.selected)");
const loadData = () => {
  // Load data from the browser
  let poltrone = JSON.parse(localStorage.getItem("poltrone"));
  let movie = localStorage.getItem("movie");
  let price = localStorage.getItem("price");
  let occupate = JSON.parse(localStorage.getItem("occupate"));

  // Set selected seats
  if (poltrone !== null && poltrone.length > 0) {
    seats.forEach((poltrona, index) => {
      if (poltrone.indexOf(index) > -1) {
        poltrona.classList.add("selected");
      }
    });
  }
  // Set seats occupate
  if (occupate !== null && occupate.length > 0) {
    seatsNotSelected.forEach((poltrona, index) => {
      if (occupate.indexOf(index) > -1) {
        poltrona.classList.add("occupied");
      }
    });
  }

  // Set movie title
  let movieSavedIdx = localStorage.getItem("movie");
  if (movieSavedIdx !== null) {
    movie.selectedIndex = movieSavedIdx;
  }

  // Update values
  updateValues();

  // Populate area info
  let seatsInfo = localStorage.getItem("N&&L");
  seatId.innerHTML = seatsInfo;
};
// Run load data
loadData();

//*************** Select seats and add event listener */
const seatsReload = document.querySelectorAll(".seat:not(.occupied");
seatsReload.forEach(element => {
  // Set seat number
  element.innerHTML = element.id;
  // Add event listener
  element.addEventListener("click", () => {
    seatRow = element.parentElement.id;
    seatNumber = element.id;

    // Add and remove color class
    if (element.classList.value == "seat") {
      element.classList.add("selected");
      // Set false remove variable
      removeSeat = false;
      // Update values
      updateValues(seatNumber, seatRow, removeSeat);
    } else {
      element.classList.remove("selected");
      // Set true remove variable
      removeSeat = true;
      // Update values
      updateValues(seatNumber, seatRow, removeSeat);
    }
  });
});

//********************* Movie title event listener */
movie.addEventListener("change", e => {
  // Ticket
  let ticket = parseInt(e.target.value);
  let movieTitle = e.target.selectedIndex;
  // Save inside localstorage movie title
  localStorage.setItem("movie", movieTitle);
  // Save price
  localStorage.setItem("price", ticket);
  // Update value
  updateValues();
});

//***************** BTN BUY EVENT LISTENER */
btnBuy.addEventListener("click", () => {
  let seat = document.querySelectorAll(".seat.selected");
  seat.forEach(element => {
    element.classList.remove("selected");
    element.classList.add("occupied");
    // Clear all fields
    element.innerHTML = "";
    seatTotal.innerHTML = "";
    costTotal.innerHTML = "";
    seatId.innerHTML = "";
    // Clear localStorage
    localStorage.clear();

    // Save inside local Storage
    let seatBusySelec = document.querySelectorAll(".row .seat.occupied");

    const localStorageSeatsOccupied = [...seatBusySelec].map(seat => {
      return [...seatsNotSelected].indexOf(seat);
    });

    // Save
    localStorage.setItem("occupate", JSON.stringify(localStorageSeatsOccupied));
  });
});