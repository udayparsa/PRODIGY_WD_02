let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function printTime() {
  let centiseconds = Math.floor(elapsedTime / 10);
  let seconds = Math.floor(centiseconds / 100);
  let minutes = Math.floor(seconds / 60);

  centiseconds %= 100;
  seconds %= 60;
  minutes %= 60;

  document.querySelector('.display').innerText = 
    `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${centiseconds < 10 ? '0' : ''}${centiseconds}`;
}

function startStopwatch() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printElapsedTime() {
      elapsedTime = Date.now() - startTime;
      printTime();
    }, 10);
  }
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  startTime = null;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  laps = [];
  printTime();
  document.querySelector('.laps').innerHTML = '';
}

function recordLap() {
  laps.push(elapsedTime);
  let lapTime = laps[laps.length - 1] - (laps.length > 1 ? laps[laps.length - 2] : 0);
  let listItem = document.createElement('li');
  listItem.innerText = `Lap ${laps.length}: ${formatTime(lapTime)}`;
  document.querySelector('.laps').appendChild(listItem);
}

function formatTime(time) {
  let centiseconds = Math.floor(time / 10);
  let seconds = Math.floor(centiseconds / 100);
  let minutes = Math.floor(seconds / 60);

  centiseconds %= 100;
  seconds %= 60;
  minutes %= 60;

  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${centiseconds < 10 ? '0' : ''}${centiseconds}`;
}
