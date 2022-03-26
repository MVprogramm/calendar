import { createNumbersArray } from "../common/createNumbersArray.js";

export const renderTimescale = () => {
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  let timeScale = `<div class="time-slot">
                    <span style="color:#ffffff" class="time-slot__time">00:00</span>
                    <div class="calendar__scale"></div>
                  </div>`;
  for (let i = 1; i < 24; i++) {
    timeScale += `<div class="time-slot">
                    <span class="time-slot__time">
                      ${i < 10 ? "0" + i + ":00" : i + ":00"}
                    </span>
                    <div class="calendar__scale"></div>
                  </div>`;
  }
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
  const calendarTimeScale = document.querySelector(".calendar__time-scale");

  calendarTimeScale.innerHTML = timeScale;
};
