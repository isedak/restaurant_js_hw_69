import React from "react";
import Button from "../../UI/Button/Button";
import './CartItem.css';

const CartItem = (props) => {
    return (
        <div className="CartItem-row">
            <div className="CartItem-column">
                <div className="flex-inner-row">
                    <p className="simple-text"><span className="black-text">
                        {props.name}</span> x {props.quantity}
                    </p>
                    <Button
                        buttonClasses={['btn-delete']}
                        click={props.removeIt}
                        label={<div className="minus"></div>}
                    />
                </div>
            </div>
            <div className="CartItem-column">
                <p className="simple-text">{props.sum}</p>
            </div>
        </div>
    );
};

export default CartItem;