import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import styles from "./Hero.module.css";
import locations from "../utilities/data";
import { months, days } from "../utilities/apiHelpers";

const FirstTab = (props) => {
  const {
    setComp,
    selectedLocation,
    setSelectedLocation,
    availableSlotsTimes,
    setActiveTab,
    selectedAllotments,
    setSelectedAllotments,
  } = props;

  const [initialValue, setInitialValue] = useState(0);
  const [finalValue, setFinalValue] = useState(2);

  const [selectedDate, setSelectedDate] = useState("");
  const [fullSelectedDate, setFullSelectedDate] = useState("");

  const handleLocation = (e) => {
    setComp("first tab");
    setSelectedLocation(e.target.value);
  };

  const handleDate = (e, maxFinalValue) => {
    const { value } = e.target;
    const sd = new Date(value);

    // handleIncrement(maxFinalValue);
    setSelectedDate(`${months[sd.getMonth()]} ${sd.getDate()}`);
    setFullSelectedDate(sd);
  };

  const tempValues = availableSlotsTimes;

  const data = Object.keys(tempValues);

  var allotments = [];

  data.map((d, i) => {
    allotments[i] = tempValues[d].map((tv) => {
      let timeZone = "am";
      let time = tv.time.substring(11, 13);
      if (time > 12) {
        time = time - 12;
        timeZone = "pm";
      }
      if (time == 12) timeZone = "pm";
      return `${time}:${tv.time.substring(14, 16)} ${timeZone}`;
    });
  });

  const daysNumber = data.map((d) => {
    const d1 = new Date(d);
    return d1;
  });

  let count = 0;

  const handleIncrement = (maxFinalValue) => {
    if (
      finalValue > maxFinalValue.length ||
      finalValue == maxFinalValue.length ||
      finalValue + 1 === maxFinalValue.length
    )
      return;
    count += 3;
    setFinalValue(finalValue + 3);
    setInitialValue(initialValue + 3);
  };

  const handleDecrement = () => {
    setFinalValue(finalValue - 3);
    setInitialValue(initialValue - 3);
  };

  var currentDate = new Date();
  var firstday = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
  ).toUTCString();
  let date = new Date(firstday);

  const fiveConsecutiveMondays = [1, 2, 3, 4, 5].map((val, i) => {
    if (i == 0) return date;
    var last = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    date = last;
    return last;
  });

  const tempMonday = new Date(
    daysNumber[0].setDate(daysNumber[0].getDate() - daysNumber[0].getDay() + 1)
  ).toUTCString();
  let reqMonday = new Date(tempMonday);

  const handleTime = (allotedTime, allotedDate) => {
    setSelectedAllotments({
      time: allotedTime,
      date: allotedDate.getDate(),
      fullDate: allotedDate,
    });
  };

  return (
    <section className="HeroContainer">
      <div className={styles.dropdownDiv}>
        <div className={styles.subHeading}>
          <p className={styles.dropdownHeading}>My preferred CIRCA office:</p>
          <Form className="heroForm">
            <Form.Select
              className="py-3 mb-2"
              aria-label="Default select example"
              value={selectedLocation}
              onChange={handleLocation}
            >
              {locations.map((location) => {
                return (
                  <option
                    value={location.country}
                  >{`CIRCA ${location.country}`}</option>
                );
              })}
            </Form.Select>
          </Form>
        </div>
        <div className={styles.subHeading}>
          <p className={styles.dropdownHeading}>My preferred week:</p>
          <Form className="heroForm">
            <Form.Select
              className="py-3 mb-2"
              aria-label="Default select example"
              onChange={(e) => handleDate(e, daysNumber)}
            >
              {fiveConsecutiveMondays.map((mondayDates) => {
                if (mondayDates >= reqMonday) {
                  return (
                    <option
                      value={mondayDates}
                      // value={`${
                      //   months[mondayDates.getMonth()]
                      // } ${mondayDates.getDate()}`}
                    >{`Week Of ${
                      months[mondayDates.getMonth()]
                    } ${mondayDates.getDate()}`}</option>
                  );
                }
              })}
            </Form.Select>
          </Form>
        </div>
      </div>
      <div className={styles.availableAllotmentsHeading}>
        {`Available time slots for the week of ${
          selectedDate === ""
            ? `${
                months[reqMonday.getMonth()]
              } ${reqMonday.getDate()}`
            : selectedDate
        }`}
      </div>
      <div className={styles.allotmentListing}>
        {initialValue !== 0 ? (
          <div onClick={handleDecrement} className={styles.arrowStyle}>
            {"<"}
          </div>
        ) : (
          <div />
        )}
        <div className={styles.datesListing}>
          {daysNumber.map((dn, i) => {
            if (
              i >= initialValue &&
              i <= finalValue &&
              (fullSelectedDate
                ? dn.getDate() >= fullSelectedDate.getDate() &&
                  dn.getMonth() >= fullSelectedDate.getMonth() &&
                  dn.getFullYear() >= fullSelectedDate.getFullYear()
                : dn > fullSelectedDate)
            ) {
              count += 1;
              return (
                <div>
                  <div className={styles.availableDatesHeading}>
                    {days[dn.getDay()]}
                  </div>
                  <div className={styles.datesStyle}>
                    <div style={{ marginRight: "2px" }}>
                      {months[dn.getMonth()]}
                    </div>
                    <div>{dn.getDate()}</div>
                  </div>
                  {allotments[i].map((allotment) => {
                    return (
                      <div>
                        <div
                          className={
                            selectedAllotments.time == allotment &&
                            selectedAllotments.date == dn.getDate()
                              ? styles.selectedTime
                              : styles.unSelectedTime
                          }
                          onClick={() => handleTime(allotment, dn)}
                        >
                          {allotment}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
        {finalValue == daysNumber.length ||
        finalValue + 1 === daysNumber.length ? (
          <div />
        ) : (
          <div
            onClick={() => handleIncrement(daysNumber)}
            className={styles.arrowStyle}
          >
            {">"}
          </div>
        )}
      </div>
      <Button
        disabled={selectedAllotments.time == ""}
        className={styles.buttonStyle}
        onClick={() => setActiveTab("second")}
      >
        Continue
      </Button>
    </section>
  );
};

export default FirstTab;
