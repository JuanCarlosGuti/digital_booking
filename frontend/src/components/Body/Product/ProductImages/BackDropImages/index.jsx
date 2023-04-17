import { useState } from "react";
import "./Backdrop.scss";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const ImagesGallery = (props) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgArray, setImgArray] = useState(props.imagesList);
  const close = () => {
    props.closeFunction(false);
  };

  const sumIndex = () => {
    const auxArray = imgArray;
    auxArray.push(auxArray.shift());

    setImgArray(auxArray);

    if (imgIndex >= imgArray.length - 1) setImgIndex(0);
    else setImgIndex(imgIndex + 1);
  };

  return (
    <div>
      <div className="backdrop"></div>
      <div className="backgroundContainer">
        <div className="backgroundContainer_GaleryContainer">
          <button onClick={close}>
            {" "}
            <MdCancel />
          </button>
          <button onClick={sumIndex}>
            <IoIosArrowDroprightCircle />
          </button>
          <div className="backgroundContainer_GaleryContainer_currentImageContainer">
            <img src={imgArray[0].url} alt="" />
          </div>
          <div className="backgroundContainer_GaleryContainer_imagesContainer">
            <p>
              {imgIndex + 1}/{imgArray.length}
            </p>
            <div className="backgroundContainer_GaleryContainer_imagesContainer_slidesContainer">
              <div className="imageBox">
                <img src={imgArray[1].url} alt="" />
              </div>
              <div className="imageBox">
                <img src={imgArray[2].url} alt="" />
              </div>
              <div className="imageBox">
                <img src={imgArray[3].url} alt="" />
              </div>
              <div className="imageBox">
                <img src={imgArray[4].url} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesGallery;
