import React, { createContext, useState } from 'react';
import ComToast from "../Components/ComToast/ComToast";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (service) => {
        setFavorites((prevFavorites) => {
            const exists = prevFavorites.find(item => item.id === service.id);
            if (exists) {
                ComToast({ text: 'Đã xóa dịch vụ khỏi danh sách đã lưu' })
                return prevFavorites.filter((item) => item.id !== service.id);
            } else {
                ComToast({ text: 'Đã thêm dịch vụ vào danh sách đã lưu' })
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
