import { getItem } from "../common/storage.js";
import { getStartOfWeek } from "../common/time.utils.js";
import { generateWeekRange } from "../common/time.utils.js";
// import { openModal } from "../common/modal.js";

export const renderHeader = () => {
  const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const currentWeek = generateWeekRange(
    getStartOfWeek(getItem("displayedWeekStart"))
  );

  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  let header_layout = `<div class="header__gmt">GMT + 02</div><div class="header__scale"></div><div class="calendar__weeks">`;
  let counter = 0;

  for (let day of daysOfWeek) {
    header_layout += `<div data-today="${
      new Date(
        getItem("displayedWeekStart").getFullYear(),
        getItem("displayedWeekStart").getMonth(),
        currentWeek[counter]
      ).getTime() ===
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).getTime()
    }" class="calendar__day-label day-label">
      <span class="day-label__day-name">${day}</span>
      <span class="day-label__day-number">${currentWeek[counter]}</span>
      <div class="day-label__day-circle"></div>
      <div class="day-label__day-cell"></div>
    </div>`;

    counter++;
  }

  header_layout += `</div>`;

  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  const header = document.querySelector(".calendar__header");
  header.innerHTML = header_layout;
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
