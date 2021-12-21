const apiWrapWithoutData = (apiPromise) =>
  new Promise((resolve) => {
    apiPromise
      .then((res) => resolve(res))
      .catch((error) => {
        resolve();
        // eslint-disable-next-line no-console
        console.error(error);
      });
  });

export const months = [
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
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default apiWrapWithoutData;
