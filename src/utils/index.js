export const daysLeft = (timestamp) => {
  const difference = new Date(timestamp).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);
  return remainingDays.toFixed(0);
};

export const convertTimestampToDateString = (timestamp) => {
  const remainingTime = timestamp - Math.floor(Date.now() / 1000);
  const seconds = Math.floor(remainingTime % 60);
  const minutes = Math.floor((remainingTime / 60) % 60);
  const hours = Math.floor((remainingTime / (60 * 60)) % 24);
  const days = Math.floor(remainingTime / (60 * 60 * 24));
  const dateString = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return dateString;
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);
  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;
  if (img.complete) callback(true);
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
