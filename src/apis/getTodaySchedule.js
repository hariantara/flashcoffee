import moment from 'moment';

//  use var to make it changes later
var data = {
  title: 'Mediterania Garden Residence',
  startTime: moment().format('hh:mm'),
  endTime: moment().add(2, 'hours').format('hh:mm'),
  isClockIn: false,
  isClockOut: false,
  clockInTime: null,
  clockOutTime: null,
};

export const getTodayScheduleApi = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
};
