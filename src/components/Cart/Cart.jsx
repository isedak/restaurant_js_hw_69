import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeDishInCart } from "../../store/restaurant.slice";
import DarkButton from "../UI/DarkButton/DarkButton";
import './Cart.css';
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
    const dishesInCart = useSelector(state => state.restaurant.dishesInCart);
    const delivery = useSelector(state => state.restaurant.delivery);
    const totalPrice = useSelector(state => state.restaurant.totalPrice);
    const dispatch = useDispatch();

    const removeDish = (i) => {
        dispatch(removeDishInCart(i));
    };

    return (
        <>
            <h2 className="Cart-title">Cart</h2>
            <div className="Cart-content">
                {dishesInCart.length > 0 ?
                    dishesInCart.map((dish, i) => {
                        return <CartItem
                            key={i + 'dish'}
                            name={dish.name}
                            quantity={dish.quantity}
                            price={dish.price}
                            sum={dish.sum}
                            removeIt={() => removeDish(i)}
                        />
                    }) :
                    <p className="Cart-simple-text">Cart is empty</p>
                }
            </div>
            <div className="Cart-bottom-column">
                <div className="Cart-row">
                    <p className="Cart-subtitle">Delivery: </p>
                    <p className="Cart-subtitle-black">{delivery}</p>
                </div>
                <div className="Cart-row">
                    <p className="Cart-subtitle">Total: </p>
                    <p className="Cart-subtitle-black">{totalPrice}</p>
                </div>
                <DarkButton
                    btnColor={'btn-place-order'}
                    label={'Place order'}
                    disabled={dishesInCart.length > 0 ? false : true}
                    click={(e) => props.showModalForm(e)}
                />
            </div>
        </>
    )
}
export default Cart;