import React, { useState, useEffect } from "react";
import ImagesGallery from "../BackDropImages";
import "./desktopComponent.scss";

const DesktopImageComponent = (props) => {
  const [isLooking, setIsLooking] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [firstImage, setFirstImage] = useState({});

  useEffect(() => {
    const imagesList = props.images ? props.images : [];
    setImagesList(imagesList);
    if (imagesList.length !== 0) {
      setFirstImage(imagesList[0]);
    }
  });
  return (
    <>
      {isLooking && (
        <ImagesGallery imagesList={imagesList} closeFunction={setIsLooking} />
      )}
      <div className="MainContainerProductImages ">
        <img
          src={firstImage.url}
          alt=""
          className="MainContainerProductImages_imgPpal"
        />
        {imagesList.slice(1, 3).map((cat, index) => (
          <img key={index} src={cat.url} alt="" className="first" />
        ))}
        {imagesList.slice(3, 5).map((cat, index) => (
          <img key={index} src={cat.url} alt="" className="second" />
        ))}
        <div className="MainContainerProductImages_buttonContainer">
          <button onClick={() => setIsLooking(true)}>Ver más</button>
        </div>
      </div>
    </>
  );
};
export default DesktopImageComponent;
