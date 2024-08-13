import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { phoneRegex } from "../../constants/Regex";
import { clearCart, createOrder, setOrder, setShowingModal } from "../../store/restaurant.slice";
import DarkButton from "../UI/DarkButton/DarkButton";
import Loader from "../UI/Loader/Loader";
import './AddOrderForm.css';

const AddOrderForm = (props) => {
    const client = useSelector(state => state.restaurant.order.client);
    const order = useSelector(state => state.restaurant.order);
    const loadingSending = useSelector(state => state.restaurant.loadingSending);

    const dispatch = useDispatch();

    const onInputChanged = (e) => {
        const { name, value } = e.target;
        dispatch(setOrder({ ...client, [name]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(createOrder(order));
        dispatch(setShowingModal(false));
        dispatch(clearCart());
    };

    return (
        <div className="form-box">
            <h1 className="form-title">Enter your contacts:</h1>
            {loadingSending ?
                <Loader />
                :
                <form className="form-flex-column"
                    onSubmit={(e) => submit(e)}
                >
                    <label className="label" htmlFor="address">Address:</label>
                    <input type="text"
                        className={'input-box'}
                        onChange={(e) => onInputChanged(e)}
                        name={"address"}
                        value={client.address}
                    />
                    <label className="label" htmlFor="name">Name:</label>
                    <input type="text"
                        className={'input-box'}
                        onChange={(e) => onInputChanged(e)}
                        name={"name"}
                        value={client.name}
                    />
                    <label className="label" htmlFor="phone">Phone number:</label>
                    <input type="tel"
                        className={'input-box'}
                        onChange={(e) => onInputChanged(e)}
                        name={"phone"}
                        placeholder={'+7 XXX XXX-XX-XX'}
                        value={client.phone}
                    />
                    <div className="btn-group-row">
                        <DarkButton
                            click={props.cancelClick}
                            btnColor={"btn-cancel"}
                            label={'Cancel'} />
                        <DarkButton
                            btnColor={"btn-save"}
                            disabled={client.address.trim() === '' ||
                                client.phone.trim() === '' || !phoneRegex.test(client.phone) ||
                                client.name.trim() === '' ? true : false}
                            label={'Submit order'} />
                    </div>
                </form>
            }
        </div>
    );
};
export default AddOrderForm;