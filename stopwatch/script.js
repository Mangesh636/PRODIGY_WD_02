const playButton = document.getElementsByClassName("play-btn")[0];
const resetButton = document.getElementsByClassName("reset-btn")[0];
const lapButton = document.getElementsByClassName("lap-btn")[0];
const clearButton = document.getElementsByClassName("lap-clear")[0];
const bg = document.getElementsByClassName("timer-display")[0];
const minute = document.getElementsByClassName("min")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("centisec")[0];
const laps = document.getElementsByClassName("laps")[0];

let isPlay = false;
let isReset = false;
let minCounter = 0;
let secCounter = 0;
let centiCounter = 0;
let lapItem = 0;
let min;
let sec;
let centiSec;

// Toggling Reset & Laps Button
const toggleButton = () => {
    lapButton.classList.remove("display-none");
    resetButton.classList.remove("display-none");
}

// Adding Play, Pause & Time
const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = 'Pause';
        bg.classList.add("bg-animation");
        min = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            minute.innerHTML = `${++minCounter} :`;
        }, 60 * 1000);
        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = `&nbsp;${++secCounter} :`;
        }, 1000);
        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);
        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset = false;
        bg.classList.remove("bg-animation");
    }
    toggleButton();
}

// Adding the Reset functionality
const reset = () => {
    isReset = true;
    play();
    lapButton.classList.add("display-none");
    resetButton.classList.add("display-none");
    minute.innerHTML = '0 :';
    second.innerHTML = '0 :';
    centiSecond.innerHTML = '0';
}

// Capturing the Laps
const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    number.innerHTML = `#${++lapItem}`
    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;
    li.append(number, timeStamp);
    laps.append(li);
    lapItem = 0;

    clearButton.classList.remove("display-none");
}

// 
// Clearing the laps
const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);
    clearButton.classList.add("display-none");
}

// calling the function on btn click
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);