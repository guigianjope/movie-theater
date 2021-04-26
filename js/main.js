
//Selections
const rows = document.querySelectorAll('.rows');
const costTotal = document.querySelector('.costTotal');

//Select seats
let seatTotal = document.querySelector('.seatTotal');
let seatId = document.querySelector('.seatId');

//Select Button
const btnBuy = document.querySelector('.btnBuy');

//Select movie selector
let movie = document.getElementById('movie');

//Select seat
const seat = document.querySelectorAll('.seat:not(.occupied)');

//Global Variables
let removeSeat = false;
let seatRow = 0;
let seatNumber = 0;

//Select rows number and set the innerHTML value
let rowNumb = document.querySelectorAll('.rowNumb');
rowNumb.forEach(element => {
    element.innerHTML = `Line ${element.id}`;
});

//UPDATE VALUES FUNCTION

const updateValues = (seatNumber, seatRow, removeSeat) => {
    //select seat with class 'selected'
    let seatSelected = document.querySelectorAll('.row .seat.selected');

    //create array for localstorage
    let localStorageSeats = [].map(seat=>{
        return [].indexOf(seat);
    });
    //save seats selected inside browser localstorage
    localStorage.setItem('Seat(s)', JSON.stringify(localStorageSeats));

    //populate info area
    if(seatNumber && seatRow !== undefined){
        if(!removeSeat){
            seatId.innerHTML += ` ${seatNumber}/${seatRow} -`
            //save value inside browser local storage
            localStorage.setItem('S&&F', seatId.innerHTML);
        }else{
            seatId.innerHTML = seatId.innerHTML.replace(
                ` ${seatNumber}/${seatRow} -`,
                ""
            );
            //save value inside browser local storage
            localStorage.setItem('S&&F', seatId.innerHTML);
        }
    }
    //set ticket price
    let ticket = movie.value;
    //seats total number
    seatTotal.innerHTML = seatSelected.length;
    //Price
    costTotal.innerHTML = seatSelected.length * ticket;
};





//Select seat and add event listener
const seatReload = document.querySelectorAll('.seat:not(.occupied)');
seatReload.forEach(element => {
    //set seat number
    element.innerHTML = element.id;
    //Add event listener
    element.addEventListener('click', () => {
        seatRow = element.parentElement.id;
        seatNumber = element.id;

        //Add and remove color class
        if(element.classList.value == 'seat') {
            element.classList.add('selected');
            //set false remove variable
            removeSeat = false;
            //Update values
            updateValues(seatNumber, seatRow, removeSeat);
        }else{
            element.classList.remove('selected');
            //set true remove variable
            removeSeat = true;
        }
    });
});