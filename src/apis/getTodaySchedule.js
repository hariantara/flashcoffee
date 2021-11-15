import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getTodayScheduleApi = () => {
  return new Promise((resolve, reject) => {
    try {
      saveIntoAsyncStorage()
        .then(res => {
          setTimeout(() => {
            resolve(res);
          }, 2000);
        })
        .catch(error => {
          throw new Error('Data Not Found!');
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const saveIntoAsyncStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getItem('@today')
        .then(data => {
          if (data) {
            // if data already in
            resolve(JSON.parse(data));
          } else {
            // if data still empty and create new one
            AsyncStorage.setItem(
              '@today',
              JSON.stringify({
                title: 'Mediterania Garden Residence',
                startTime: moment().format('hh:mm'),
                endTime: moment().add(2, 'hours').format('hh:mm'),
                isClockIn: false,
                isClockOut: false,
                clockInTime: null,
                clockOutTime: null,
              }),
            )
              .then(res => {
                console.log('save res: ', res);
                AsyncStorage.getItem('@today')
                  .then(detail => {
                    setTimeout(() => {
                      console.log('detail: ', detail);
                      if (detail) {
                        resolve(JSON.parse(detail));
                      } else {
                        throw new Error('Data not Found');
                      }
                    }, 1000);
                  })
                  .catch(error => {
                    throw new Error(error);
                  });
              })
              .catch(error => {
                throw new Error(error);
              });
          }
        })
        .catch(error => {
          throw new Error(error)
        })
    } catch (error) {
      reject(error);
    }
  });
};

export default getTodayScheduleApi;
