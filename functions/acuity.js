require("dotenv").config();

var Acuity = require("acuityscheduling");

exports.handler = async function (event, context) {
  var userId = process.env.NEXT_APP_ACUITY_USER_ID;
  var apiKey = process.env.NEXT_APP_ACUITY_API_KEY;

  var acuity = Acuity.basic({
    userId: userId,
    apiKey: apiKey,
  });

  acuity.request("/appointments", function (err, res, appointments) {
    if (err) return console.error(err);
    console.log(appointments);

    return { statusCode: 200, body: JSON.stringify({ appointments }) };
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hellow World my Acuity" }),
  };
};
