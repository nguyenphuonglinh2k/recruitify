export const convertDateFromTime = time => {
  if (!time) return new Date();
  const arrayTime = time.split(":");
  let hour, minute;
  if (arrayTime.length) {
    hour = arrayTime[0];
    minute = arrayTime[1];
    const second = arrayTime[2] || "0";
    const millisecond = arrayTime[3] || "0";
    return new Date().setHours(hour, minute, second, millisecond);
  }
};

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
