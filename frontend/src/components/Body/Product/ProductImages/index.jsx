import "./ProductImages.scss";
import MobileComponent from "./MobileComponent";
import DesktopImageComponent from "./desktopComponent";
import { useEffect, useState } from "react";

export default function ProductImages({ product }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const updateDimensions = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const images = product.images || [];

  return (
    <>
      {!isMobile && <DesktopImageComponent images={images} />}
      {isMobile && <MobileComponent images={images} />}
    </>
  );
}
