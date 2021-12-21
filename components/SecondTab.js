import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import styles from "./Hero.module.css";

const SecondTab = (props) => {
  const { setActiveTab, userDetails, setUserDetails } = props;
  //   const [userDetails, setUserDetails] = useState({
  //     inputs: {
  //       fName: "",
  //       lName: "",
  //       email: "",
  //       phone: "",
  //     },
  //     errors: {
  //       email: "",
  //       fName: "",
  //       lName: "",
  //       phone: "",
  //     },
  //     totalErrors: 0,
  //   });

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [userDetails.errors]);

  const inputHandler = (inputName) => (e) => {
    setUserDetails({
      ...userDetails,
      inputs: {
        ...userDetails.inputs,
        [inputName]: e.target.value,
      },
    });
  };

  const onButtonClick = () => {
    const errors = {};
    let totalErrors = 0;
    // eslint-disable-next-line no-useless-escape
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (userDetails.inputs.email.length > 0) {
      if (!regexEmail.test(userDetails.inputs.email)) {
        errors.email = "Invalid!! Please check your email";
        totalErrors += 1;
      }
    } else {
      errors.email = "This field can't be blank";
      totalErrors += 1;
    }

    if (userDetails.inputs.fName.length === 0) {
      errors.fName = "This field can't be blank";
      totalErrors += 1;
    }

    if (userDetails.inputs.lName.length === 0) {
      errors.lName = "This field can't be blank";
      totalErrors += 1;
    }

    if (userDetails.inputs.phone.length === 0) {
      errors.phone = "This field can't be blank";
      totalErrors += 1;
    }

    if (totalErrors !== 0) {
      setUserDetails({
        ...userDetails,
        errors,
        totalErrors,
      });
      return;
    }

    setActiveTab("third");

    const data = {
      email: userDetails.inputs.email,
      fName: userDetails.inputs.fName,
      lName: userDetails.inputs.lName,
    };
  };

  return (
    <section className="HeroContainer">
      <div className={styles.mainDiv}>
        <div className={styles.subDiv}>
          <input
            type="text"
            placeholder="First Name *"
            onChange={inputHandler("fName")}
            className={styles.textFieldStyle}
          />
          {userDetails.errors &&
            userDetails.errors.fName !== "" &&
            userDetails.errors.fName !== undefined && (
              <img
                alt="Error"
                data-tip={userDetails.errors.fName}
                data-background-color="#FF6964"
                src="/error-hover-icon.svg"
                className={styles.imgStyle}
              />
            )}
        </div>
        <div className={styles.subDiv}>
          <input
            type="text"
            placeholder="Last Name *"
            onChange={inputHandler("lName")}
            className={styles.textFieldStyle}
          />
          {userDetails.errors &&
            userDetails.errors.lName !== "" &&
            userDetails.errors.lName !== undefined && (
              <img
                alt="Error"
                data-tip={userDetails.errors.lName}
                data-background-color="#FF6964"
                src="/error-hover-icon.svg"
                className={styles.imgStyle}
              />
            )}
        </div>
        <div className={styles.subDiv}>
          <input
            type="text"
            placeholder="E-Mail *"
            onChange={inputHandler("email")}
            className={styles.textFieldStyle}
          />
          {userDetails.errors &&
            userDetails.errors.email !== "" &&
            userDetails.errors.email !== undefined && (
              <img
                alt="Error"
                data-tip={userDetails.errors.email}
                data-background-color="#FF6964"
                src="/error-hover-icon.svg"
                className={styles.imgStyle}
              />
            )}
        </div>
        <div className={styles.subDiv}>
          <input
            type="number"
            placeholder="Phone *"
            onChange={inputHandler("phone")}
            className={styles.textFieldStyle}
          />
          {userDetails.errors &&
            userDetails.errors.phone !== "" &&
            userDetails.errors.phone !== undefined && (
              <img
                alt="Error"
                data-tip={userDetails.errors.phone}
                data-background-color="#FF6964"
                src="/error-hover-icon.svg"
                className={styles.imgStyle}
              />
            )}
        </div>
      </div>
      <Button className={styles.buttonStyle} onClick={onButtonClick}>
        Continue
      </Button>
    </section>
  );
};

export default SecondTab;
