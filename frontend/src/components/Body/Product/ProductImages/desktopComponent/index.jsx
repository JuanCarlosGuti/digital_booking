import { useState } from "react";
import ImagesGallery from "../BackDropImages";
import "./desktopComponent.scss";

const DesktopImageComponent = ({ images = [] }) => {
  const [isLooking, setIsLooking] = useState(false);
  const firstImage = images[0];

  if (!firstImage) {
    return null;
  }

  return (
    <>
      {isLooking && <ImagesGallery imagesList={images} closeFunction={setIsLooking} />}
      <div className="MainContainerProductImages ">
        <img src={firstImage.url} alt="" className="MainContainerProductImages_imgPpal" />
        {images.slice(1, 3).map((img) => (
          <img key={img.id} src={img.url} alt="" className="first" />
        ))}
        {images.slice(3, 5).map((img) => (
          <img key={img.id} src={img.url} alt="" className="second" />
        ))}
        <div className="MainContainerProductImages_buttonContainer">
          <button onClick={() => setIsLooking(true)}>Ver más</button>
        </div>
      </div>
    </>
  );
};
export default DesktopImageComponent;
