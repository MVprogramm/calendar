import { renderTimescale } from "./calendar/timescale.js";
import { renderWeek } from "./calendar/calendar.js";
import { renderHeader } from "./calendar/header.js";
import { initNavigation } from "./header/navigation.js";
import { setItem, getItem } from "./common/storage.js";

import { getStartOfWeek } from "./common/time.utils.js";
// import { initEventForm } from './events/createEvent.js';

import { generateWeekRange } from "./common/time.utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // инициализация всех элементов
  let thisDay = new Date();

  setItem("displayedWeekStart", getStartOfWeek(thisDay));
  renderHeader();

  const theDay = getItem("displayedWeekStart");
  renderTimescale();
  renderWeek(theDay.getDate());
  initNavigation();
  // initEventForm();

  const favicon = document.querySelector("#favicon");
  favicon.href = `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${thisDay.getDate()}.ico`;
});
