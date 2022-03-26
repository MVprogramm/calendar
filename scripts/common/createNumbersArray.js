export const createNumbersArray = (from, to) => {
  // ф-ция должна генерировать массив чисел от from до to
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
};
