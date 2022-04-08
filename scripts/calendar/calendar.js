import { getItem } from "../common/storage.js";
// import { generateWeekRange } from '../common/time.utils.js';
// import { renderEvents } from '../events/events.js';
import { createNumbersArray } from "../common/createNumbersArray.js";

const renderClockLine = () => {
  const dayStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();
  const dayTime = new Date().getTime();

  const topLine = Math.round((dayTime - dayStart) / 60000);

  const clockLine = `<div class="clock clock__line" style="top:${topLine}px">
                      <div class="clock clock__circle"></div>
                    </div>`;

  const clockToday = document.querySelector(
    '.calendar__day[data-clock="true"]'
  );

  clockToday.innerHTML += clockLine;
};

export const renderWeek = (startDay) => {
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  let week = ``;

  const days = createNumbersArray(startDay, startDay + 6);

  for (let i = 0; i < 24; i++) {
    week += `<div class="calendar__time-slot" data-time="${i}">`;

    for (let y = 0; y < 7; y++) {
      week += `<div class="calendar__day" data-day="${days[y]}" data-clock="${
        new Date(
          getItem("displayedWeekStart").getFullYear(),
          getItem("displayedWeekStart").getMonth(),
          days[y]
        ).getTime() ===
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ).getTime()
      }"></div>`;
    }

    week += `</div>`;
  }

  const weekElem = document.querySelector(".calendar__week");
  weekElem.innerHTML = week;

  renderClockLine();

  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
};
