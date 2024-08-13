import React from "react";
import DarkButton from "../UI/DarkButton/DarkButton";
import './Dish.css';

const Dish = (props) => {
    return (
        <div className="Dish-row">
            <div className="Dish-column">
                <img className="img-box" src={props.imageUrl} alt={props.alt} />
            </div>
            <div className="Dish-column">
                <p className="Dish-name">{props.name}</p>
                <p>Price: {props.price}</p>
                <DarkButton
                    click={props.addToCart}
                    btnColor={'btn-add-to-cart'}
                    label={'Add to cart'}
                />
            </div>
        </div>
    )
};

export default Dish;