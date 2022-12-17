import React, { useEffect, useState } from "react";
import { getFeaturesByProduct,getUserByToken } from "../services/fetchService";
const images = require.context("../img", true);

export default function FetchExample() {
  const [data, setData] = useState([]);

  const loadImage = (imageName) => images(`./${imageName}.svg`);
  useEffect(() => {
    obtainFeatures();
  }, []);


  const obtainFeatures = () => {
    // getUserByToken()
    //   .then((response) => {
    //     // console.log("response ok:");
    //     console.log(response);
    //     setData(response);
    //   })
    //   .catch((error) => {
    //     alert(`Error while retreiving the users: ${error}`);
    //   })
    //   .finally(() => {
    //   });
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
