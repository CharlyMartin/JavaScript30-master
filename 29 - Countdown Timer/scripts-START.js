//1
let countdown; // creation of the variable to be assisgned and updated below inside the timer function.
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('button[data-time]');


//2
function timer(seconds) {
  clearInterval(countdown); // clear the timer is one has already started.

  const now = Date.now();
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds) // once
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    displayTimeLeft(secondsLeft); // every second
    if (secondsLeft <= 0) {
      clearInterval(countdown);
    };
  }, 1000);
};

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  console.log({
    minutes: minutes,
    seconds: remainderSeconds
  });
  const humanTime = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`
  document.title = humanTime;
  timerDisplay.textContent = humanTime;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? "0" : ""}${minutes}`
  // endTime = timestamp
}

function startTimerFromButtons() {
  const time = parseInt(this.dataset.time);
  timer(time);
}

function startTimerFromForm(e) {
  e.preventDefault();
  const min = parseInt(this.minutes.value); // .minutes is the name of the input, not a method.
  timer(min * 60);
  this.reset();
}

//3
buttons.forEach(button => button.addEventListener('click', startTimerFromButtons))
document.customForm.addEventListener('submit', startTimerFromForm)
