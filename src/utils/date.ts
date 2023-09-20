const isDateLessThanOrEqualToNextDay = (inputDate: Date): boolean => {
  if (!inputDate) {
    return false;
  }

  const currentDate = new Date();

  const nextDaySameTime = new Date(currentDate);
  nextDaySameTime.setDate(currentDate.getDate() + 1);

  return inputDate <= nextDaySameTime;
};

export { isDateLessThanOrEqualToNextDay }
