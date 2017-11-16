// Setting Constants for DOM Elements
const tallyContainer = document.getElementById("tallys");
const addTally = document.getElementById("addTally");
const dayCounter = document.getElementById("day-counter");
const settingsIcon = document.getElementById("settings-icon");
const reset = document.getElementById("reset");
const modal = document.getElementById("modal");
const settingsMenu = document.getElementById("settings-menu");
const settingsForm = document.getElementById("settings-form");
const setMainTitle = document.getElementById("set-main-title");
const setTallyTitle = document.getElementById("set-tally-title");
const setAddTallyTitle = document.getElementById("set-add-tally-title");
const setTimeCounterTitle = document.getElementById("set-time-counter-title");
const mainTitle = document.getElementById("main-title");
const tallyTitle = document.getElementById("tally-title");
const timeCounterTitle = document.getElementById("time-counter-title");

// Pulling Variables from Local Storage Or Initializing Them
let startTime = new Date(localStorage.getItem("startTime")) || new Date();
let tallys = parseInt(localStorage.getItem("tallys")) || 0;
let currentTime = new Date();
let days = Math.floor(timeDif() / 1000 / 60 / 60 / 24);
let hrs = Math.floor((timeDif() / 1000 / 60 / 60) % 24);

dayCounter.innerText = `${prependZero(days)} d : ${prependZero(hrs)} h`;
mainTitle.innerText = localStorage.getItem("mainTitle") || "Progress Tracker";
tallyTitle.innerText = localStorage.getItem("tallyTitle") || "Instances Avoided/Succeeded";
timeCounterTitle.innerText = localStorage.getItem("timeCounterTitle") || "Time Tracker";
addTally.innerText = localStorage.getItem("addTallyTitle") || "Add";
renderTallys();

// Functions
function prependZero(number) {
	return (number + "").length === 1 ? "0" + number : number;
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

function openModal() {
	modal.classList.remove("hidden");
	setMainTitle.value = mainTitle.innerText;
	setTallyTitle.value = tallyTitle.innerText;
	setTimeCounterTitle.value = timeCounterTitle.innerText;
	setAddTallyTitle.value = addTally.innerText;
}

function closeModal() {
	modal.classList.add("hidden");
}

function updateSettings(e) {
	e.preventDefault();
	mainTitle.innerText = setMainTitle.value;
	localStorage.setItem("mainTitle", mainTitle.innerText);
	tallyTitle.innerText = setTallyTitle.value;
	localStorage.setItem("tallyTitle", tallyTitle.innerText);
	timeCounterTitle.innerText = setTimeCounterTitle.value;
	localStorage.setItem("timeCounterTitle", timeCounterTitle.innerText);
	addTally.innerText = setAddTallyTitle.value;
	localStorage.setItem("addTallyTitle", addTally.innerText);
	closeModal();
}

function renderTallys() {
	localStorage.setItem("tallys", tallys);
	tallyContainer.innerHTML = "";
	for (var i = 0; i < tallys; i++) {
		tallyContainer.innerHTML += "<i class='material-icons'>favorite</i>";
	}
}

// Event Listeners
modal.addEventListener("click", closeModal);
settingsIcon.addEventListener("click", openModal);
settingsMenu.addEventListener("click", e => e.stopPropagation());
settingsForm.addEventListener("submit", updateSettings);
addTally.addEventListener("click", () => {
	tallys += 1;
	renderTallys();
});
reset.addEventListener("click", () => {
	resetCounters();
});
