export const getDateStr = date => {
  if (date == null) {
    date = new Date();
  } else {
    date = new Date(date);
    if (Number.isNaN(date.getDate())) {
      return "";
    }
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1)}-${String(date.getDate())} ${date.getHours()}:${String(date.getMinutes())}:${String(date.getSeconds())}`
}