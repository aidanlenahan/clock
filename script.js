// JavaScript code for timer, stopwatch, and clock functionality

let stopwatchInterval;
let timerInterval;
let alarmTimeout;

// Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.querySelector('.clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

// Function to update the bottom-left clock
function updateBottomLeftClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.querySelector('.bottom-left-clock').textContent = timeString;
}

setInterval(updateBottomLeftClock, 1000); // Update every second
updateBottomLeftClock();

// ...



// Stopwatch
let stopwatchRunning = false;
let stopwatchTime = 0;

document.getElementById('startStopwatch').addEventListener('click', () => {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 10);
        stopwatchRunning = true;
    }
});

document.getElementById('stopStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    document.querySelector('.clock').textContent = '00:00:00';
});

function updateStopwatch() {
    stopwatchTime += 10;
    const centiseconds = String(Math.floor((stopwatchTime / 10) % 100)).padStart(2, '0');
    const seconds = String(Math.floor((stopwatchTime / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((stopwatchTime / 60000) % 60)).padStart(2, '0');
    const stopwatchString = `${minutes}:${seconds}:${centiseconds}`;
    document.querySelector('.clock').textContent = stopwatchString;
}

// Alarm
document.getElementById('setAlarm').addEventListener('click', () => {
    const alarmTime = document.getElementById('alarmTime').value;
    const [alarmHours, alarmMinutes] = alarmTime.split(':');
    const now = new Date();
    const alarm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHours, alarmMinutes);

    const timeUntilAlarm = alarm - now;

    if (timeUntilAlarm > 0) {
        alarmTimeout = setTimeout(() => {
            alert('Alarm!');
        }, timeUntilAlarm);
    } else {
        alert('Please select a future time for the alarm.');
    }
});

// Timer
let timerRunning = false;
let timerTime = 0;

document.getElementById('startTimer').addEventListener('click', () => {
    if (!timerRunning) {
        const timerInput = parseInt(document.getElementById('timerInput').value, 10);
        if (!isNaN(timerInput) && timerInput > 0) {
            timerTime = timerInput * 1000;
            timerInterval = setInterval(updateTimer, 10);
            timerRunning = true;
        }
    }
});

document.getElementById('stopTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
});

function updateTimer() {
    if (timerTime <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        alert('Timer is up!');
    } else {
        timerTime -= 10;
        const seconds = String(Math.floor((timerTime / 1000) % 60)).padStart(2, '0');
        const timerString = `00:${seconds}:00`;
        document.querySelector('.clock').textContent = timerString;
    }
}

