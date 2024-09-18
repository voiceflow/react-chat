export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours % 12 || 12}:${minutes >= 10 ? '' : '0'}${minutes} ${hours >= 12 ? 'pm' : 'am'}`;
};
