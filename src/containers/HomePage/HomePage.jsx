import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOrderForm from "../../components/AddOrderForm/AddOrderForm";
import Cart from "../../components/Cart/Cart";
import Dish from "../../components/Dish/Dish";
import Loader from "../../components/UI/Loader/Loader";
import Modal from "../../components/UI/Modal/Modal";
import { addDishToCart, getDishes, setShowingModal } from "../../store/restaurant.slice";
import './HomePage.css';

const HomePage = () => {
    const showModal = useSelector(state => state.restaurant.showingModal);
    const dishes = useSelector(state => state.restaurant.dishes);
    const loading = useSelector(state => state.restaurant.loading);
    const showError = useSelector(state => state.restaurant.showError);
    const errorMessage = useSelector(state => state.restaurant.errorMessage);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDishes());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const showModalForm = (e) => {
        e.preventDefault();
        dispatch(setShowingModal(true));
    };

    const closeModalForm = (e) => {
        e.preventDefault();
        dispatch(setShowingModal(false));
    };

    const addToCart = (dish) => {
        dispatch(addDishToCart(dish))
    };

    return (
        <div className="HomePage-container">
            <Modal show={showModal}>
                <AddOrderForm
                    cancelClick={closeModalForm}
                />
            </Modal>
            <div className="HomePage-background flex-row">
                <div className="main-flex-row">
                    <div className="HomePage-left-column">
                        {showError ? <p className='Home-error-text'>{errorMessage}</p> : null}
                        <div className="content">
                            {loading ?
                                <Loader />
                                :
                                dishes === null || dishes === undefined ?
                                    <p className='Home-error-text'>No dishes yet</p>
                                    :
                                    Object.keys(dishes).map((key) => {
                                        return <Dish
                                            key={key}
                                            alt={key + 'img'}
                                            imageUrl={dishes[key].imageUrl}
                                            price={dishes[key].price}
                                            name={dishes[key].name}
                                            addToCart={() => addToCart(dishes[key])}
                                        />
                                    })}
                        </div>
                    </div>
                    <div className="HomePage-right-column">
                        <Cart
                            showModalForm={showModalForm} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomePage;