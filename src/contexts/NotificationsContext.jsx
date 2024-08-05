import React, { createContext, useState, useEffect } from 'react';
import { getData, patchData } from "../api/api";
import { useAuth } from "../../auth/useAuth"; 
export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        getData(`/notifications`, {})
            .then((notifications) => {
                setNotifications(notifications?.data?.contends)
            })
            .catch((error) => {
                // console.error("Error fetching notifications:", error);
            });
    };

    // Gọi fetchNotifications khi component mount
    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);
    // Function để cập nhật notifications
    const updateNotifications = async () => {
        await fetchNotifications();
    };

    return (
        <NotificationsContext.Provider value={{ notifications, updateNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};
