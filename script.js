let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function updateDisplay() {
  const time = new Date(elapsedTime);
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');
  const seconds = String(time.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

document.getElementById('start').addEventListener('click', () => {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
});

document.getElementById('pause').addEventListener('click', () => {
  clearInterval(timerInterval);
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  laps.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
  if (elapsedTime === 0) return; // prevent lap on zero
  const time = display.textContent;
  const li = document.createElement('li');
  li.textContent = `Lap ${laps.children.length + 1}: ${time}`;
  laps.appendChild(li);
});
