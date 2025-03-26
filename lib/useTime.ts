import { DateFormatType } from "@/enums/DateFormatType";

export const getDate = (day: Date, time: Date) => {
  day.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
  return day.getTime();
};

export const getDateTime = (day: Date) => {
  return day.getTime();
};

export const dateFormat = (date?: Date, formatDate = DateFormatType.Date) => {
  if (!date) {
    return "N/A";
  }
  const time: Date = new Date(date);
  const formattedDate = time.toLocaleString(
    "en-US",
    getDateFormatByLocale(formatDate)
  );
  return formattedDate;
};

export const getTick: (date?: Date) => number = (date) => {
  if (!date) {
    return 0;
  }
  return new Date(date).getTime();
};

export const getDateFormatByLocale: (
  format: DateFormatType
) => Intl.DateTimeFormatOptions = (format) => {
  switch (format) {
    case DateFormatType.Date:
      return {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
    case DateFormatType.FullDate:
      return {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
    default:
      return {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
  }
};
