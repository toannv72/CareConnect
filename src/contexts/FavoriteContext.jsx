import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (service) => {
        setFavorites((prevFavorites) => {
            const exists = prevFavorites.find(item => item.id === service.id);
            if (exists) {
                return prevFavorites.filter((item) => item.id !== service.id);
            } else {
                return [...prevFavorites, service];
            }
        });
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
