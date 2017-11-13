// Setting Constants for DOM Elements
const tallyContainer = document.getElementById("tallys");
const addTally = document.getElementById("addTally");
const dayCounter = document.getElementById("day-counter");
const settings = document.getElementById("settings");
const reset = document.getElementById("reset");
const modal = document.getElementById("modal");

// Pulling Variables from Local Storage Or Initialize Them
let startTime = new Date(localStorage.getItem("startTime")) || new Date();
let tallys = parseInt(localStorage.getItem("tallys")) || 0;
let currentTime = new Date();
let days = Math.floor(timeDif() / 1000 / 60 / 60 / 24);
let hrs = Math.floor(timeDif() / 1000 / 60 / 60 % 24); 


dayCounter.innerText = `${prependZero(days)} d : ${prependZero(hrs)} h`;
renderTallys();

// Functions 
function prependZero(number) {
    return (number + "").length === 1 ? "0" + number : number ;
}

function timeDif() {
    return currentTime.getTime() - startTime.getTime();
}

function resetCounters() {
    startTime = new Date();
	currentTime = new Date();
	tallys = 0;
	localStorage.setItem("startTime", startTime);
    localStorage.setItem("tallys", 0);
    renderTallys();
	dayCounter.innerText = Math.floor(
		(currentTime.getTime() - startTime.getTime()) / 1000
	);
}

function toggleModal() {
	modal.classList.toggle("hidden");
}

function renderTallys() {
	localStorage.setItem("tallys", tallys);
	tallyContainer.innerHTML = "";
	for (var i = 0; i < tallys; i++) {
		tallyContainer.innerHTML += "<i class='material-icons'>favorite</i>";
	}
}

// Event Listeners 
modal.addEventListener("click", toggleModal);
settings.addEventListener("click", toggleModal);
addTally.addEventListener("click", () => {
    tallys += 1;
	renderTallys();
});
reset.addEventListener("click", () => {
	resetCounters();
});
