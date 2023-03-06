const DateFMT = (date = new Date()) => {
  if (!(date instanceof Date) || date.toString() === 'Invalid Date') {
    throw new Error('Invalid Date');
  }
  return {
    get yyyy() { return date.getFullYear() },
    get MM() { return String(date.getMonth() + 1).padStart(2, 0) },
    get dd() { return String(date.getDate()).padStart(2, 0) },
    get hh() { return String(date.getHours()).padStart(2, 0) },
    get mm() { return String(date.getMinutes()).padStart(2, 0) },
    get ss() { return String(date.getSeconds()).padStart(2, 0) }
  }
}

module.exports = {
  DateFMT
}