export const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes >= 10 ? '' : '0'}${minutes} ${hours >= 12 ? 'pm' : 'am'}`;
};
