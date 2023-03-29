import React, { useState, memo, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import PropTypes from "prop-types";
import moment from "moment";
import { AppConstant } from "const";
import { COLORS } from "utils";
import { ArrowIcon } from "icons";

const CommonCalendar = ({
  current,
  onDayPress,
  markedDates,
  styles,
  ...otherProps
}) => {
  const today = moment().format(AppConstant.FORMAT_DATE_WITH_HYPHEN);
  const [date, setDate] = useState(
    moment(current).format(AppConstant.FORMAT_DATE_WITH_HYPHEN) || today,
  );

  const onChangeDay = dateObject => {
    setDate(dateObject.dateString);
    onDayPress && onDayPress(dateObject);
  };

  useEffect(() => {
    setDate(moment(current).format(AppConstant.FORMAT_DATE_WITH_HYPHEN));
  }, [current]);

  return (
    <CalendarList
      style={styles?.root}
      current={date}
      onDayPress={onChangeDay}
      disableMonthChange={false}
      enableSwipeMonths
      horizontal
      pagingEnabled
      calendarWidth={Dimensions.get("window").width}
      hideArrows={false}
      hideExtraDays={false}
      renderArrow={direction => (
        <ArrowIcon
          style={direction === "right" && defaultStyles.chevronToward}
          color={COLORS.black}
        />
      )}
      headerStyle={[defaultStyles.header, styles?.header]}
      theme={{
        todayTextColor: COLORS.green,
        dayTextColor: COLORS.black,
        textDisabledColor: COLORS.grey[100],
        disabledArrowColor: COLORS.grey[200],
        textSectionTitleColor: COLORS.black,
        monthTextColor: COLORS.black,
        textDayFontWeight: "400",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "bold",
        textDayFontSize: 14,
        textMonthFontSize: 14,
        textDayHeaderFontSize: 14,
        selectedDayBackgroundColor: COLORS.grey[300],
        selectedDayTextColor: COLORS.black,
        dotColor: COLORS.blue.neutral,
        selectedDotColor: COLORS.blue.neutral,
      }}
      markingType="custom"
      markedDates={{
        [today]: {
          customStyles: {
            text: {
              fontSize: 16,
              fontWeight: "bold",
            },
          },
        },
        ...markedDates,
      }}
      calendarStyle={defaultStyles.calendarStyle}
      {...otherProps}
    />
  );
};

export default memo(CommonCalendar);

CommonCalendar.propTypes = {
  onDayPress: PropTypes.func,
  current: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  styles: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    header: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }),
  markedDates: PropTypes.object,
};

LocaleConfig.locales.en = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mars",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  dayNamesShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

const defaultStyles = StyleSheet.create({
  chevronToward: {
    transform: [{ rotate: "180deg" }],
  },
  today: {
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    borderBottomColor: COLORS.grey[200],
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  calendarStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});
