export const formatDate = (date: Date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(newDate);
};
