let timerId = null;
const savedTimerMinutes = Number(localStorage.getItem("workoutTimerMinutes"));
const defaultTimerMinutes = Number.isInteger(savedTimerMinutes) && savedTimerMinutes >= 1 && savedTimerMinutes <= 120
  ? savedTimerMinutes
  : 45;
let totalSeconds = defaultTimerMinutes * 60;
let remainingSeconds = totalSeconds;

const remainingMinutesElement = document.getElementById("remaining-minutes");
const remainingSecondsElement = document.getElementById("remaining-seconds");
const totalMinutesElement = document.getElementById("total-minutes");
const timerStatusElement = document.getElementById("timer-status");
const progressStatusElement = document.getElementById("progress-status");
const progressValueElement = document.getElementById("progress-value");
const progressTrackElement = document.getElementById("progress-track");

totalMinutesElement.textContent = defaultTimerMinutes;

function updateTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const elapsedPercentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  remainingMinutesElement.textContent = String(minutes).padStart(2, "0");
  remainingSecondsElement.textContent = String(seconds).padStart(2, "0");
  remainingMinutesElement.parentElement.setAttribute(
    "aria-label",
    `남은 시간 ${minutes}분 ${seconds}초`
  );
  progressValueElement.style.width = `${elapsedPercentage}%`;
  progressTrackElement.setAttribute("aria-label", `진행률 ${Math.round(elapsedPercentage)}퍼센트`);
}

function setTimerStatus(status, progressStatus) {
  timerStatusElement.textContent = status;
  progressStatusElement.textContent = progressStatus;
}

function tick() {
  if (remainingSeconds <= 0) {
    stopTimer();
    setTimerStatus("운동 완료", "완료");
    return;
  }

  remainingSeconds -= 1;
  updateTimerDisplay();
}

function startTimer() {
  if (timerId !== null || remainingSeconds <= 0) {
    return;
  }

  timerId = setInterval(tick, 1000);
  setTimerStatus("운동 중", "진행 중");
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
    setTimerStatus("운동 일시정지", "일시정지");
  }
}

function resetTimer() {
  stopTimer();
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
  setTimerStatus("운동 준비됨", "시작 전");
}

function selectExercise(exerciseInput) {
  totalSeconds = Number(exerciseInput.value) * 60;
  totalMinutesElement.textContent = exerciseInput.value;
  resetTimer();
}

updateTimerDisplay();