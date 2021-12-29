import cart, {loadCartFromLocalStorage, subscribeToStore} from "./slice/cartSlice";
import user from "./slice/userSlice";
import {logger} from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";

const buildStore = () => {
    const store = configureStore({
        reducer: {
            cart, user
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
        preloadedState: {
            cart: loadCartFromLocalStorage()
        }
    });

    subscribeToStore(store);

    return store;
}

const store = buildStore();

export default store;