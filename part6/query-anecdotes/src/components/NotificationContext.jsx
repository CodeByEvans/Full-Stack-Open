import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case `SHOW_NOTIFICATION`:
            return action.payload;
        case `CLEAR_NOTIFICATION`:
            return null;
        default:
            return state;
    }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null);

    return (
        <NotificationContext.Provider value={{ notification, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext);
  };