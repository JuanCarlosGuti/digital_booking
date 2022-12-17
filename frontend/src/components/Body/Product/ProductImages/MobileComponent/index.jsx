import React from "react";
import "./mobileComponent.scss";

export default class MobileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageCount: 1,
      isMobile: false,
      productImages: [],
    };
  }

  updateState = (property, value) => {
    this.setState({
      ...this.state,
      [property]: value,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.product !== this.props.product) {
      this.updateState("productImages", this.props.product.images);
      const slider = document.getElementById("slider");
      let sliderSection = document.getElementsByClassName("slider__section");
      let i = 0;
      let sliderSectionLast = sliderSection[0];
      setInterval(() => {
        this.updateState("imageCount", i + 1);
        const value = 100 * i;
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft = `-${value}%`;
        slider.style.transition = "all 2s";
        i++;
        if (i >= this.props.product.length) i = 0;
      }, 3000);
    }
  }

  render() {
    return (
      <div className="container-slider">
        <div className="slider" id="slider">
          {this.props.product &&
            this.props.product.map((cat) => (
              <div key={cat.id} className="slider__section">
                <img src={cat.url} alt="" className="slider__img " />
              </div>
            ))}
        </div>
        <div className="countContainer">
          <span>{this.state.imageCount}/10</span>
        </div>
      </div>
    );
  }
}
