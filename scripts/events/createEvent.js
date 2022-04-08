import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__img");
const setDateElem = document.querySelector(".event-form__field_date");
const eventDay = document.querySelector("#eventDay");
const eventStartTime = document.querySelector("#eventStartTime");
const eventEndTime = document.querySelector("#eventEndTime");
const inputDateElem = document.querySelector("#date");
const inputStartTimeElem = document.querySelector("#startTime");
const inputEndTimeElem = document.querySelector("#endTime");

export const appendDate = (currentDay) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  eventDay.innerHTML = `${
    days[currentDay.getDay()]
  }, the ${currentDay.getDate()}th ${
    months[currentDay.getMonth()]
  } ${currentDay.getFullYear()}`;

  inputDateElem.setAttribute(
    "value",
    `${currentDay.getFullYear()}-${currentDay.getMonth()}-${currentDay.getDate()}`
  );
};

export const appendStartTime = (currentDay) => {
  let eventStartHours = currentDay.getHours();
  eventStartHours < 10
    ? (eventStartHours = "0" + eventStartHours)
    : (eventStartHours = "" + eventStartHours);
  let eventStartMinutes = currentDay.getMinutes();
  eventStartMinutes < 10
    ? (eventStartMinutes = "0" + eventStartMinutes)
    : (eventStartMinutes = "" + eventStartMinutes);
  eventStartTime.innerHTML = `${eventStartHours}:${eventStartMinutes}`;
};

export const appendEndTime = (currentDay) => {
  let eventEndHours = currentDay.getHours();
  eventEndHours < 10
    ? (eventEndHours = "0" + eventEndHours)
    : (eventEndHours = "" + eventEndHours);
  let eventEndMinutes = currentDay.getMinutes();
  eventEndMinutes < 10
    ? (eventEndMinutes = "0" + eventEndMinutes)
    : (eventEndMinutes = "" + eventEndMinutes);
  eventEndTime.innerHTML = `${eventEndHours}:${eventEndMinutes}`;
};

appendDate(new Date());
appendStartTime(new Date());
appendEndTime(new Date(new Date().getTime() + 15 * 60 * 1000));

const setStartTimeElem = document.querySelector(
  ".event-form__field_start-time"
);
const setEndTimeElem = document.querySelector(".event-form__field_end-time");

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений
  eventFormElem.reset();
}

function onCloseEventForm() {
  // здесь нужно закрыть модальное окно и очистить форму
  clearEventForm();
  closeModal();
}

function setDate() {
  // Show a date picker
  inputDateElem.showPicker();

  function newDate() {
    appendDate(new Date(inputDateElem.value));
  }
  inputDateElem.addEventListener("change", newDate);
}

function setStartTime() {
  // Show a time picker
  inputStartTimeElem.showPicker();

  function newStartTime() {
    eventStartTime.textContent = inputStartTimeElem.value;

    const newStart = new Date(
      new Date(inputDateElem.getAttribute("value")).getFullYear(),
      new Date(inputDateElem.getAttribute("value")).getMonth(),
      new Date(inputDateElem.getAttribute("value")).getDate(),
      inputStartTimeElem.value.split(":")[0],
      inputStartTimeElem.value.split(":")[1]
    );

    inputStartTimeElem.setAttribute("value", newStart);
  }

  inputStartTimeElem.addEventListener("change", newStartTime);
}

function setEndTime() {
  // Show a time picker
  inputEndTimeElem.showPicker();

  function newEndTime() {
    eventEndTime.textContent = inputEndTimeElem.value;

    const newEnd = new Date(
      new Date(inputDateElem.getAttribute("value")).getFullYear(),
      new Date(inputDateElem.getAttribute("value")).getMonth(),
      new Date(inputDateElem.getAttribute("value")).getDate(),
      inputEndTimeElem.value.split(":")[0],
      inputEndTimeElem.value.split(":")[1]
    );

    inputEndTimeElem.setAttribute("value", newEnd);
  }

  inputEndTimeElem.addEventListener("change", newEndTime);
}

function onCreateEvent(event) {
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
  closeEventFormBtn.addEventListener("click", onCloseEventForm);
  setDateElem.addEventListener("click", setDate);
  setStartTimeElem.addEventListener("click", setStartTime);
  setEndTimeElem.addEventListener("click", setEndTime);
}
