import { useEffect, useState } from "react";
import "./mobileComponent.scss";

export default function MobileComponent({ images = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      return undefined;
    }
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="container-slider">
      <div className="slider" style={{ marginLeft: `-${index * 100}%`, transition: "all 2s" }}>
        {images.map((img) => (
          <div key={img.id} className="slider__section">
            <img src={img.url} alt="" className="slider__img " />
          </div>
        ))}
      </div>
      <div className="countContainer">
        <span>
          {index + 1}/{images.length}
        </span>
      </div>
    </div>
  );
}
