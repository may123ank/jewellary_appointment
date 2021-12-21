import { basic } from "acuityscheduling";

var userId = 24448045;
var apiKey = "237b058135bf820f43062468fbd2a61e";

var acuity = basic({
  userId: userId,
  apiKey: apiKey,
});

const datesListing = (filters) =>
  acuity.request(
    `/availability/dates?appointmentTypeID=${filters.type_id}&month=2016-02&calendarID=${filters.calendar_id}&timezone=Europe/London`
  );

export const timesListing = (filters) =>
  acuity.request(
    `/availability/times?appointmentTypeID=${filters.type_id}&calendarID=${filters.calendar_id}&date=${filters.dates}`
  );

export const confirmAppointment = (filters) => {

  const {first_name, last_name, email, type_id, datetime} = filters;

  var options = {
    method: "POST",
    body: {
      appointmentTypeID: type_id,
      datetime: datetime,
      firstName: first_name,
      lastName: last_name,
      email: email,
    },
  };
  acuity.request("/appointments", options);
};

export default datesListing;
