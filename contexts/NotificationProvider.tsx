import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification } from '../type/notification';
import ToastNotification from '../src/components/ToastNotification'

interface ContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<ContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification: Notification = { id, ...notification };
    setNotifications(prev => [...prev, newNotification]);
    if (newNotification.duration) {
      setTimeout(() => removeNotification(id), newNotification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
      {notifications.map(notification => (
        <ToastNotification key={notification.id} notification={notification} onClose={removeNotification} />
      ))}
    </NotificationContext.Provider>
  );
};