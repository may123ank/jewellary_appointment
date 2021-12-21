import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tabs, Tab, Form, Button } from "react-bootstrap";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

import styles from "./Hero.module.css";
import locations from "../utilities/data";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";
import {
  // timesListing,
  esDatesListing,
  esTimesListing,
} from "../utilities/apis";
import apiWrapWithoutData from "../utilities/apiHelpers";
import datesListing, { timesListing } from "../utilities/myAcuity";

const Main = () => {
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [activeTab, setActiveTab] = useState("first");

  const [comp, setComp] = useState("main comp");
  const [loading, setLoading] = useState(false);

  const [availableSlotsTimes, setAvailableSlotsTimes] = useState([]);

  const [selectedAllotments, setSelectedAllotments] = useState({
    time: "",
    date: "",
    fullDate: "",
  });

  const [userDetails, setUserDetails] = useState({
    inputs: {
      fName: "",
      lName: "",
      email: "",
      phone: "",
    },
    errors: {
      email: "",
      fName: "",
      lName: "",
      phone: "",
    },
    totalErrors: 0,
  });

  const handleLocation = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleButtonClick = (clicked) => {
    let buttonClicked = false;
    if (clicked) buttonClicked = true;

    if ((comp === "main comp" && buttonClicked) || comp === "first tab") {
      (async () => {
        const sl = locations.filter(
          (location) => location.country === selectedLocation
        );
        let dateApiToCall =
          selectedLocation === "Barcelona" || selectedLocation === "Madrid"
            ? datesListing
            : datesListing;
        let timeApiToCall =
          selectedLocation === "Barcelona" || selectedLocation === "Madrid"
            ? timesListing
            : timesListing;

        var currentDate = new Date();
        var firstday = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        ).toUTCString();
        let date = new Date(firstday);

        var nextSunday = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);

        setLoading(true);
        const availableAllotmentDates = await dateApiToCall({
          type_id: sl[0].id,
          calendar_id: sl[0].calender_id,
          next: 1,
          timezone: "America/New_York",
          month: nextSunday.toISOString(),
        });

        const tempArr = availableAllotmentDates && availableAllotmentDates.data.map((ad) => {
          return ad.date;
        });

        const finalArr = tempArr.map((ta) => {
          return ta;
        });

        const sundaysDate =
          availableAllotmentDates.data &&
          availableAllotmentDates.data.map((ad, i) => {
            if (availableAllotmentDates.data.length == i + 1) {
              return ad.date;
            }
          });

        if (
          availableAllotmentDates.data &&
          availableAllotmentDates.data.length === 0
        ) {
          var currentDate = new Date(nextSunday);
          firstday = new Date(
            currentDate.setDate(currentDate.getDate() - currentDate.getDay())
          ).toUTCString();
          date = new Date(firstday);
          nextSunday = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        } else {
          var currentDate = new Date(sundaysDate);

          firstday = new Date(
            currentDate.setDate(currentDate.getDate() - currentDate.getDay())
          ).toUTCString();

          date = new Date(firstday);

          nextSunday = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        }

        const availableAllotmentDates2 = await dateApiToCall({
          type_id: sl[0].id,
          calendar_id: sl[0].calender_id,
          next: 2,
          timezone: "America/New_York",
          month: nextSunday.toISOString(),
        });

        const tempArr2 = availableAllotmentDates2.data.map((ad) => {
          return ad.date;
        });

        const finalArr2 = tempArr2.map((ta) => {
          return ta;
        });

        finalArr.push(...finalArr2);

        const availableAllotmentTimes = await timeApiToCall({
          type_id: sl[0].id,
          calendar_id: sl[0].calender_id,
          next: 1,
          timezone: "America/New_York",
          dates: finalArr,
        });

        setAvailableSlotsTimes(availableAllotmentTimes.data);
        setLoading(false);
        setShowAvailableSlots(true);
      })();
    }
  };

  useEffect(() => {
    handleButtonClick(false);
  }, [selectedLocation]);

  if (loading) {
    return (
      <div className={styles.loaderStyle}>
        <BeatLoader width={150} height={10} color="#30BEF5" />
      </div>
    );
  }

  return (
    <>
      {!showAvailableSlots ? (
        <Container className={styles.mainStyle}>
          <Row>
            <Col md="12" xs="12">
              <div>
                <p>
                  When you're ready to sell your jewelry, diamonds, or watches,
                  a CIRCA specialist is here to help
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12" xs="12">
              <div className="heroTab">
                <Tabs defaultActiveKey="first">
                  <Tab eventKey="first" title="In-person Appointment">
                    <div className={styles.subHeading}>
                      <p>
                        Schedule a private appointment at <br /> one of our
                        offices.
                      </p>
                      <Form className="heroForm">
                        <Form.Select
                          className="py-3 mb-2"
                          aria-label="Default select example"
                          onChange={handleLocation}
                        >
                          <option disabled selected>
                            Select a Location
                          </option>
                          {locations.map((locationData) => {
                            return (
                              <option value={locationData.country}>
                                {`${locationData.country}, ${locationData.address}`}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <Button
                          className={styles.buttonStyle}
                          disabled={selectedLocation === ""}
                          onClick={() => handleButtonClick(true)}
                        >
                          Book an Appointment
                        </Button>
                      </Form>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container style={{ width: "60%" }}>
          <Row>
            <Col>
              <div className={styles.availableAllotmentsHeading}>
                <p>{`Your Appointment at CIRCA ${selectedLocation}`}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="heroTab">
              <Tabs activeKey={activeTab} style={{ display: "flex" }}>
                <Tab eventKey="first" title="Select Date, Time, & Location">
                  <FirstTab
                    setComp={setComp}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    availableSlotsTimes={availableSlotsTimes}
                    setActiveTab={setActiveTab}
                    selectedAllotments={selectedAllotments}
                    setSelectedAllotments={setSelectedAllotments}
                  />
                </Tab>
                <Tab eventKey="second" title="Enter Your Contact Details">
                  <SecondTab
                    setActiveTab={setActiveTab}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                  />
                </Tab>
                <Tab eventKey="third" title="Describe Your Item(s)">
                  <ThirdTab
                    selectedLocation={selectedLocation}
                    selectedAllotments={selectedAllotments}
                    userDetails={userDetails}
                  />
                </Tab>
              </Tabs>
            </div>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Main;
