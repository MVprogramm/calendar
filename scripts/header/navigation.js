import { getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/time.utils.js";

const navElem = document.querySelector(".navigation");
const navButton = document.querySelector(".navigation__today-btn");
const displayedMonthElem = document.querySelector(
  ".navigation__displayed-month"
);

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  const month = getDisplayedMonth(getItem("displayedWeekStart"));
  // вставить в .navigation__displayed-month
  const monthInterval = document.querySelector(".navigation__displayed-month");

  monthInterval.textContent = month;
}

const onChangeWeek = (event) => {
  const weekInterval = 1000 * 60 * 60 * 24 * 7;
  const thisWeek = getItem("displayedWeekStart").getTime() + weekInterval / 2;

  // при переключении недели обновите displayedWeekStart в storage
  if (event.target.dataset.step === "right") {
    const nextWeek = new Date(thisWeek + weekInterval);
    setItem("displayedWeekStart", getStartOfWeek(nextWeek));
  } else {
    const lastWeek = new Date(thisWeek - weekInterval);
    setItem("displayedWeekStart", getStartOfWeek(lastWeek));
  }
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  renderHeader();
  renderCurrentMonth();

  renderWeek(getItem("displayedWeekStart").getDate());

  event.stopImmediatePropagation();
};

const onToday = (event) => {
  setItem("displayedWeekStart", getStartOfWeek(new Date()));

  renderHeader();
  renderCurrentMonth();

  renderWeek(getItem("displayedWeekStart").getDate());

  event.stopImmediatePropagation();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navButton.addEventListener("click", onToday);
  navElem.addEventListener("click", onChangeWeek);
};
