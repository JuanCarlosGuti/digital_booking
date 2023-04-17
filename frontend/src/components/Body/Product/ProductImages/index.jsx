import "./ProductImages.scss";
import MobileComponent from "./MobileComponent";
import DesktopImageComponent from "./desktopComponent";
import React from "react";

export default class ProductImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      productImages: []
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
    }
  }
  

  updateDimensions = () => {
    this.updateState("isMobile", window.innerWidth <= 768);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      <>
        {!this.state.isMobile && <DesktopImageComponent images={this.state.productImages} />}
        {this.state.isMobile && (
          <MobileComponent product={this.state.productImages} />
        )}
      </>
    );
  }
}
