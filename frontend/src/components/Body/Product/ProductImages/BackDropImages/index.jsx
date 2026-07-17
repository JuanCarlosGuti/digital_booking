import { useState } from "react";
import "./Backdrop.scss";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const ImagesGallery = ({ imagesList, closeFunction }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgArray, setImgArray] = useState(imagesList);

  const close = () => closeFunction(false);

  const sumIndex = () => {
    const rotated = [...imgArray.slice(1), imgArray[0]];
    setImgArray(rotated);
    setImgIndex((prev) => (prev >= imgArray.length - 1 ? 0 : prev + 1));
  };

  const preview = imgArray.slice(1, 5);

  return (
    <div>
      <div className="backdrop"></div>
      <div className="backgroundContainer">
        <div className="backgroundContainer_GaleryContainer">
          <button onClick={close}>
            {" "}
            <MdCancel />
          </button>
          {imgArray.length > 1 && (
            <button onClick={sumIndex}>
              <IoIosArrowDroprightCircle />
            </button>
          )}
          <div className="backgroundContainer_GaleryContainer_currentImageContainer">
            <img src={imgArray[0].url} alt="" />
          </div>
          <div className="backgroundContainer_GaleryContainer_imagesContainer">
            <p>
              {imgIndex + 1}/{imgArray.length}
            </p>
            <div className="backgroundContainer_GaleryContainer_imagesContainer_slidesContainer">
              {preview.map((img) => (
                <div className="imageBox" key={img.id}>
                  <img src={img.url} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesGallery;
