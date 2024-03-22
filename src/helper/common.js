import moment from 'moment-timezone';

export default {
  formatDate(value) {
    return moment(value).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
  },
  formatDateUTC(value) {
    return moment(value).tz('Asia/Ho_Chi_Minh').format();
  },
};
