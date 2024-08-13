import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../api/apiServiceClass";

const namespace = 'restaurant';

export const getDishes = createAsyncThunk(
    `${namespace}/getDishes`,
    async () => {
        return await apiService.getDishes();
    }
);

export const createOrder = createAsyncThunk(
    `${namespace}/createOrder`,
    async (order) => {
        await apiService.createOrder(order);
    }
);

export const restaurantSlice = createSlice({
    name: namespace,
    initialState: {
        dishes: {},
        dishesInCart: [],
        delivery: 150,
        totalPrice: 150,
        loading: false,
        loadingSending: false,
        showingModal: false,
        order: {
            client: {
                name: '',
                address: '',
                phone: ''
            },
            dishes: []
        },
        showError: false,
        errorMessage: ''
    },
    reducers: {
        clearCart(state) {
            state.dishesInCart = [];
            state.order = {
                client: {
                    name: '',
                    address: '',
                    phone: ''
                },
                dishes: []
            };
            state.totalPrice = state.delivery;
        },
        setOrder(state, action) {
            const theseDishes = state.dishesInCart.map((d) => {
                return { name: d.name, quantity: d.quantity }
            });
            state.order = {
                client: {
                    name: action.payload.name,
                    address: action.payload.address,
                    phone: action.payload.phone
                },
                dishes: theseDishes
            };
        },
        setShowingModal(state, action) {
            state.showingModal = action.payload
        },
        addDishToCart(state, action) {
            try {
                const index = state.dishesInCart.findIndex(d => d.name === action.payload.name);
                let copyState = [...state.dishesInCart];
                if (index !== -1) {
                    const copyDish = { ...copyState[index] };
                    copyDish.quantity = copyDish.quantity + 1;
                    copyDish.sum = copyDish.price * copyDish.quantity;
                    copyState[index] = copyDish;
                    state.dishesInCart = copyState;
                } else {
                    copyState.push({
                        name: action.payload.name,
                        quantity: 1,
                        price: action.payload.price,
                        sum: action.payload.price
                    });
                    state.dishesInCart = copyState;
                };
                state.totalPrice += parseInt(action.payload.price);
            } catch (error) {
                console.log(error);
            };
        },
        removeDishInCart(state, action) {
            try {
                let copyState = [...state.dishesInCart];
                const copyDish = { ...copyState[action.payload] };
                if (copyDish.quantity > 1) {
                    copyDish.quantity = copyDish.quantity - 1;
                    copyDish.sum = copyDish.price * copyDish.quantity;
                    copyState[action.payload] = copyDish;
                    state.dishesInCart = copyState;
                } else {
                    copyState.splice(action.payload, 1);
                    state.dishesInCart = copyState;
                };
                state.totalPrice -= parseInt(copyDish.price);
            } catch (error) {
                console.log(error);
            };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getDishes.pending, (state) => {
                state.loading = true
            })
            .addCase(getDishes.rejected, (state) => {
                state.loading = false;
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(getDishes.fulfilled, (state, action) => {
                state.errorMessage = '';
                state.showError = false;
                state.loading = false;
                state.dishes = action.payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.loadingSending = true
            })
            .addCase(createOrder.rejected, (state) => {
                state.loadingSending = false;
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loadingSending = false;
                state.errorMessage = '';
                state.showError = false;
            })
    }
});

export const {
    clearCart,
    setOrder,
    setShowingModal,
    addDishToCart,
    removeDishInCart
} = restaurantSlice.actions;