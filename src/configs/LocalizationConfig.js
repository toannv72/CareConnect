import { LocaleConfig } from 'react-native-calendars';

// Define Vietnamese locale configuration
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1, ', 'Tháng 2, ', 'Tháng 3, ', 'Tháng 4, ',
    'Tháng 5, ', 'Tháng 6, ', 'Tháng 7, ', 'Tháng 8, ',
    'Tháng 9, ', 'Tháng 10, ', 'Tháng 11, ', 'Tháng 12, '
  ],
  monthNamesShort: [
    'Thg 1, ', 'Thg 2, ', 'Thg 3, ', 'Thg 4, ',
    'Thg 5, ', 'Thg 6, ', 'Thg 7, ', 'Thg 8, ',
    'Thg 9, ', 'Thg 10, ', 'Thg 11, ', 'Thg 12, '
  ],
  dayNames: [
    'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư',
    'Thứ năm', 'Thứ sáu', 'Thứ bảy'
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay'
};

// Set Vietnamese as the default locale
LocaleConfig.defaultLocale = 'vi';

export default LocaleConfig;
