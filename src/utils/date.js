export const getFormatDate = (d) => {
  let date = new Date(d);
  const yyyy = date.getFullYear();
  let mm = date.getMonth();
  let dd = date.getDate();

  return `${dd} ${months[mm]}, ${yyyy}`;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
