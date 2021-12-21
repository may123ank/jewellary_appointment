import axios from "axios";

const datesListing = (filters = "") =>
  axios.get("https://api.circajewels.com/v1/booking/us/dates", {
    params: {
      ...filters,
    },
  });

export const timesListing = (filters = "") =>
  axios.get("https://api.circajewels.com/v1/booking/us/times", {
    params: {
      ...filters,
    },
  });

  export const esDatesListing = (filters = "") =>
  axios.get("https://api.circajewels.com/v1/booking/es/dates", {
    params: {
      ...filters,
    },
  });

export const esTimesListing = (filters = "") =>
  axios.get("https://api.circajewels.com/v1/booking/es/times", {
    params: {
      ...filters,
    },
  });

export const confirmAppointment = ({
  first_name,
  last_name,
  email,
  phone,
  quantity,
  comment,
  submitWasPressed,
  subscribe,
  utm_params,
  loading,
  redTextField,
  type_id,
  calendar_id,
  datetime,
  sizeOfFiles,
  images,
  additionalPhoto,
}) =>
  axios.post("https://api.circajewels.com/v1/booking/us/appointments", {
    first_name,
    last_name,
    email,
    phone,
    quantity,
    comment,
    submitWasPressed,
    subscribe,
    utm_params,
    loading,
    redTextField,
    type_id,
    calendar_id,
    datetime,
    sizeOfFiles,
    images,
    additionalPhoto,
  });

  export const esconfirmAppointment = ({
    first_name,
    last_name,
    email,
    phone,
    quantity,
    comment,
    submitWasPressed,
    subscribe,
    utm_params,
    loading,
    redTextField,
    type_id,
    calendar_id,
    datetime,
    sizeOfFiles,
    images,
    additionalPhoto,
  }) =>
    axios.post("https://api.circajewels.com/v1/booking/es/appointments", {
      first_name,
      last_name,
      email,
      phone,
      quantity,
      comment,
      submitWasPressed,
      subscribe,
      utm_params,
      loading,
      redTextField,
      type_id,
      calendar_id,
      datetime,
      sizeOfFiles,
      images,
      additionalPhoto,
    });

export default datesListing;

// var Acuity = require("acuityscheduling");

//   var userId = 24448045;
//   var apiKey = "https://acuityscheduling.com/api/v1/";

//   var acuity = Acuity.basic({
//     userId: userId,
//     apiKey: apiKey,
//   });

//   acuity.request("availability/dates", function (err, res, appointments) {
//     if (err) return console.error(err);
//     console.log(appointments);

//     return { statusCode: 200, body: JSON.stringify({ appointments }) };
//   });
