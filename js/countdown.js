let eventDate = new Date("2024-12-25T00:00:00").getTime();
const countdownContainer = document.getElementById("countdown-container");
const hourElement = document.getElementById("hours");
const minuteElement = document.getElementById("minutes");
const secondElement = document.getElementById("seconds");
const alertSound = document.getElementById("alert-sound");

const modal = document.getElementById("time-modal");
const timeInput = document.getElementById("time-input");
const setTimeButton = document.getElementById("set-time");

countdownContainer.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

setTimeButton.addEventListener("click", () => {
  const userTime = new Date(timeInput.value).getTime();
  if (!isNaN(userTime)) {
    eventDate = userTime;
    modal.classList.add("hidden");
  } else {
    alert("Por favor, insira uma data e hora válidas.");
  }
});

countdownContainer.addEventListener("click", () => {
  modal.classList.add("time-modal");
});



function updateCountdown() {
  const now = new Date().getTime();
  const timeRemaining = eventDate - now;

  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  hourElement.innerText = String(hours).padStart(2, '0');
  minuteElement.innerText = String(minutes).padStart(2, '0');
  secondElement.innerText = String(seconds).padStart(2, '0');

  // Controle de cores e animação
  if (timeRemaining <= 10 * 1000) {
    hourElement.classList.add("text-red-700", "animate-pulse");
    minuteElement.classList.add("text-red-700", "animate-pulse");
    secondElement.classList.add("text-red-700", "animate-pulse");
    alertSound.play();
  } else if (timeRemaining <= 60 * 1000) {
    hourElement.classList.add("text-yellow-600");
    minuteElement.classList.add("text-yellow-600");
    secondElement.classList.add("text-yellow-600");
    hourElement.classList.remove("text-red-700", "animate-pulse");
    minuteElement.classList.remove("text-red-700", "animate-pulse");
    secondElement.classList.remove("text-red-700", "animate-pulse");
  } else if (timeRemaining <= 5 * 60 * 1000) {
    hourElement.classList.add("text-yellow-400");
    minuteElement.classList.add("text-yellow-400");
    secondElement.classList.add("text-yellow-400");
    hourElement.classList.remove("text-yellow-600", "text-red-700", "animate-pulse");
    minuteElement.classList.remove("text-yellow-600", "text-red-700", "animate-pulse");
    secondElement.classList.remove("text-yellow-600", "text-red-700", "animate-pulse");
  } else {
    hourElement.classList.add("text-sky-500");
    minuteElement.classList.add("text-sky-500");
    secondElement.classList.add("text-sky-500");
    hourElement.classList.remove("text-yellow-400", "text-yellow-600", "text-red-700", "animate-pulse");
    minuteElement.classList.remove("text-yellow-400", "text-yellow-600", "text-red-700", "animate-pulse");
    secondElement.classList.remove("text-yellow-400", "text-yellow-600", "text-red-700", "animate-pulse");
  }

  // Exibe o temporizador zerado
  if (timeRemaining < 0) {
    hourElement.innerText = '00';
    minuteElement.innerText = '00';
    secondElement.innerText = '00';
    clearInterval(countdownInterval);
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);
