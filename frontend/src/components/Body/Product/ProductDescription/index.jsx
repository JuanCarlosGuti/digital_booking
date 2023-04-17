import "./ProductDescription.scss";

export default function ProductDescription(props){
    return(
        <div className="prodDescription">
        <div className="prodDescription__container">
            <h3>{props.product.title}</h3>
            <p>{props.product.description}</p>
            </div>
        </div>
    )
}