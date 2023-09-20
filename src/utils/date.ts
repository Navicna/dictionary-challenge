import moment from 'moment';


const isDateLessThanOrEqualToNextDay = (inputDate: string): boolean => {
  if (!inputDate) {
    return false;
  }

  const nextDayDate = moment(inputDate).add(1, 'day');
  const now = moment();
  
  
  return now.isSameOrBefore(nextDayDate);
};

export { isDateLessThanOrEqualToNextDay }
