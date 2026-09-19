const settingsForm = document.getElementById("settings-form");
const timerMinutesInput = document.getElementById("timer-minutes");
const savedTimerMinutes = localStorage.getItem("workoutTimerMinutes");

if (savedTimerMinutes !== null) {
  timerMinutesInput.value = savedTimerMinutes;
}

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const minutes = Number(timerMinutesInput.value);
  const isValidMinutes = Number.isInteger(minutes) && minutes >= 1 && minutes <= 120;

  if (!isValidMinutes) {
    timerMinutesInput.setCustomValidity("1분 이상 120분 이하로 입력해 주세요.");
    timerMinutesInput.reportValidity();
    return;
  }

  timerMinutesInput.setCustomValidity("");
  localStorage.setItem("workoutTimerMinutes", String(minutes));
  window.location.href = "index.html";
});

timerMinutesInput.addEventListener("input", () => {
  timerMinutesInput.setCustomValidity("");
});