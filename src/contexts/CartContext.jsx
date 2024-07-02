import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { servicePackageId, elderId, orderDates } = action.payload;
            const existingItem = state.find(
                item => item.servicePackageId === servicePackageId && item.elderId === elderId
            );

            if (existingItem) {
                return state.map(item =>
                    item.servicePackageId === servicePackageId && item.elderId === elderId
                        ? { ...item, orderDates: [...item.orderDates, ...orderDates] }
                        : item
                );
            } else {
                return [...state, action.payload];
            }
        }
        case 'REMOVE_ITEM': {
            return state.filter(item => !(item.servicePackageId === action.payload.servicePackageId && item.elderId === action.payload.elderId));
        }
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
