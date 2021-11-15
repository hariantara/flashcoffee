import moment from 'moment';

const getNextSchedule = () => {
  return new Promise((resolve, reject) => {
    try {
      let days = [];
      const weekStart = moment().clone().startOf('week');

      for (let i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days'));
      }

      if (days?.length === 7) {
        createDummyData(days)
          .then(cleanDummyData => {
            setTimeout(() => {
              resolve(cleanDummyData);
            }, 1500);
          })
          .catch(error => {
            throw new Error(error);
          });
      } else {
        throw new Error('Server Error');
      }
    } catch (error) {
      console.log('Error API getNextSchedule: ', error);
      reject(error);
    }
  });
};

const createDummyData = listDayInWeek => {
  return new Promise(async (resolve, reject) => {
    try {
      if (listDayInWeek && listDayInWeek?.length === 7) {
        const dummy = await Promise.all(
          listDayInWeek?.map((d, i) => {
            return {
              id: i + 1,
              date: moment(d, 'ddd, YYYY MM DD').format(),
              detail:
                i % 2 === 0
                  ? {
                      date: moment(d, 'ddd, YYYY MM DD').format(),
                      title: i % 2 !== 0 ? 'Mediterania' : 'Pluit Village',
                      startTime: moment(d).format('hh:mm'),
                      endTime: moment(d)
                        .add(i % 2 === 0 ? 3 : 5, 'hours')
                        .format('hh:mm'),
                    }
                  : null,
            };
          }),
        );

        if (dummy?.length === listDayInWeek?.length) {
          resolve(dummy);
        } else {
          throw new Error('Server Error');
        }
      } else {
        throw new Error('Server Error');
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default getNextSchedule;
