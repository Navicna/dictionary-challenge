import moment, {Moment} from 'moment';


const isDateLessThanOrEqualToNextDay = (inputDate: Moment): boolean => {
  if (!inputDate) {
    return false;
  }

  const nextDayDate = moment(inputDate).add(1, 'day');
  const now = moment();
  
  
  return now.isSameOrBefore(nextDayDate);
};

const now = (): Moment => moment();
  

export { isDateLessThanOrEqualToNextDay, now }
