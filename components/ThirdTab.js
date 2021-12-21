import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import styles from "./Hero.module.css";
import ImageUploading from "react-images-uploading";
import { confirmAppointment, esconfirmAppointment } from "../utilities/apis";
import apiWrapWithoutData from "../utilities/apiHelpers";
import locations from "../utilities/data";
import Success from "./Success";

const ThirdTab = (props) => {
  const { selectedLocation, selectedAllotments, userDetails } = props;

  const [productData, setProductData] = useState({
    description: "",
    termsAgreement: false,
    moreThan4: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const inputHandler = (inputName) => (e) => {
    setProductData({
      ...productData,
      [inputName]: e.target.value,
    });
  };

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleButtonClick = () => {
    (async () => {
      const sl = locations.filter(
        (location) => location.country === selectedLocation
      );

      let confirmationApiToCall =
        selectedLocation === "Barcelona" || selectedLocation === "Madrid"
          ? esconfirmAppointment
          : confirmAppointment;

      var fields = selectedAllotments.time.split(":");

      var min;

      if (fields[0].length == 1) {
        min = selectedAllotments.time.substring(2, 4);
      } else {
        min = selectedAllotments.time.substring(3, 5);
      }

      var hours;
      if (selectedAllotments.time.includes("pm") && fields[0] !== "12") {
        hours = 12 + parseInt(selectedAllotments.time.substring(0, 2));
        // selectedAllotments.fullDate.toISOString().substring(11, 13)
      } else {
        hours = selectedAllotments.time.substring(0, 2);
      }

      const imgName = images && images[0] && images[0].length !== 0 ? images[0].file.name : '';
      const imgUrl = images && images[0] && images[0].length !== 0 ? images[0].data_url : '';
      const size = images && images[0] && images[0].length !== 0 ? images[0].file.size : 0;

      const slotBooking = await apiWrapWithoutData(
        confirmationApiToCall({
          first_name: userDetails.inputs.fName,
          last_name: userDetails.inputs.lName,
          email: userDetails.inputs.email,
          phone: userDetails.inputs.phone,
          quantity: productData.moreThan4 ? "4+" : "4-",
          comment: productData.description,
          submitWasPressed: true,
          subscribe: true,
          utm_params: {},
          loading: false,
          redTextField: false,
          type_id: sl[0].id,
          calendar_id: sl[0].calender_id,
          datetime: `${selectedAllotments.fullDate
            .toISOString()
            .substring(0, 11)}${hours}:${min}:${selectedAllotments.fullDate
            .toISOString()
            .substring(18, 20)}`,
          sizeOfFiles: size,
          images: imgName !== '' ? [{ name: imgName, content: imgUrl }] : [],
          additionalPhoto: imgName !== '' ? [{ name: imgName, content: imgUrl }] : [],
        })
      );
        setShowSuccess(true);
    })();
  };

  return (
    <section className="HeroContainer">
      {showSuccess ? (
        <Success />
      ) : (
        <>
          <div className={styles.mainHeading}>
            Tell us about the items you're interested in selling
          </div>
          <div className={styles.paragraphStyle} style={{ marginTop: "20px" }}>
            <div style={{ color: "rgb(0, 68, 121)" }}>
              Please provide an accurate description and add images for each
              item.
            </div>
            Descriptions may include: brand/designer, gemstone size and quality,
            metal type, condition, and availability of original box & item
            registration papers. For diamonds, include the Diamond Grading
            Report name and # (e.g. GIA 12345678) or upload image / PDF.
          </div>
          <div style={{ marginTop: "20px" }}>MY ITEM DESCRIPTION(S)</div>
          <div style={{ position: "relative" }}>
            <textarea
              className={styles.textArea}
              rows="10"
              cols="70"
              onChange={inputHandler("description")}
            ></textarea>
            {productData.description === "" && (
              <div class={styles.placeholder} role="button">
                <div>Examples:</div>
                <br />
                <div>
                  ”Item #1: Cartier Love Bracelet from 2016 in 18k white gold in
                  excellent condition with the original box and papers.”
                </div>
                <br />
                <div>
                  “Item #2: I have a few items including a Rolex Submariner and
                  engagement ring with a GIA Diamond Grading Report #12345. I
                  have also uploaded a PDF of the Diamond Grading Report.”
                </div>
              </div>
            )}
          </div>
          <div style={{ marginTop: "30px" }}>MY PHOTO(S)</div>
          <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image["data_url"]} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <input
              type="checkbox"
              onChange={() => {
                setProductData({
                  ...productData,
                  moreThan4: !productData.moreThan4,
                });
              }}
            />
            <div style={{ marginLeft: "8px" }}>
              I have MORE than 4 items to sell.
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <input
              type="checkbox"
              onChange={() => {
                setProductData({
                  ...productData,
                  termsAgreement: !productData.termsAgreement,
                });
              }}
            />
            <div style={{ marginLeft: "8px" }}>
              By engaging CIRCA`s services, you agree to our
              <a
                target="_blank"
                href="https://www.circajewels.com/privacy-policy/"
                style={{ marginLeft: "3px" }}
              >
                privacy policy.
              </a>
            </div>
          </div>
          <Button
            disabled={!productData.termsAgreement}
            style={{ marginTop: "20px" }}
            className={styles.buttonStyle}
            onClick={handleButtonClick}
          >
            Confirm Appointment
          </Button>
        </>
      )}
    </section>
  );
};

export default ThirdTab;
