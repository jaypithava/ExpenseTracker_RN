export function getFormattedDate(date) {
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

export function getDateMinusDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
