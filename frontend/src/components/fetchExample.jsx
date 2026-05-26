import React, { useEffect, useState } from "react";
const images = require.context("../img", true);

export default function FetchExample() {
  const [data, setData] = useState([]);

  const loadImage = (imageName) => images(`./${imageName}.svg`);
  useEffect(() => {
    obtainFeatures();
  }, []);


  const obtainFeatures = () => {
  };

  
  return (
    <div>
      {/* {data.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "rgba(1,1,1,0.3)",
            width: "200px",
            margin: "0 auto",
          }}
        >
          <div>
            <img src={loadImage(item.referenceIcon)} alt="" />
          </div>
        </div>
      ))} */}
    </div>
  );
}
