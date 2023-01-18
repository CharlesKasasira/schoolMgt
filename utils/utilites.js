export const timeConvert = (num) => {
  const totalhours = num / 60;
  const hours = Math.floor(totalhours);
  const minutes = Math.round((totalhours - hours) * 60);
  return hours + " hour(s) and " + minutes + " minute(s).";
};
