const modalElem = document.querySelector(".modal");
const modalContentElem = document.querySelector(".modal__content");

// опишите ф-ции openModal и closeModal
export const openModal = () => {
  const modalWindow = document.querySelector(".modal");
  modalWindow.classList.remove("hidden");
};

export const closeModal = () => {
  const modalWindow = document.querySelector(".modal");
  modalWindow.classList.add("hidden");
};
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана
