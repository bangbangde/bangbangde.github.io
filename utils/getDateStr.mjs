const pad = num => (''+num).padStart(2, '0');

export const getDateStr = (date, i = 0) => {
  if (date == null) {
    date = new Date();
  } else {
    date = new Date(date);
    if (Number.isNaN(date.getDate())) {
      return "";
    }
  }

  return [
    `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`,
    `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
  ][i]
}