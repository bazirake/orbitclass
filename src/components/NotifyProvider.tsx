import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import io from "socket.io-client";
import NotificationList from "../components/NotificationList";

// ------------------ Interfaces ------------------
interface NotificationData {
  type: string;
  message: string;
}

interface NotifyContextType {
  count: number;
  notifications: NotificationData[];
  resetCount: () => void;
  showNotifications: () => void;
  visitMenu: (menuName: string) => void;
  visitReport: (menuName: string) => void;
  takequizReport: (menuName: string) => void;
  studentinfoReport: (menuName: string) => void;
  chatReport: (menuName: string) => void;
  courseReport: (menuName: string) => void;
  viewcourseReport: (menuName: string) => void;
  assignquizReport: (menuName: string) => void;
  dashboardReport: (menuName: string) => void;
}

// ------------------ Context ------------------
const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export const useNotify = (): NotifyContextType => {
  const context = useContext(NotifyContext);
  if (!context)
    throw new Error("useNotify must be used within a NotifyProvider");
  return context;
};

// ------------------ Socket ------------------
const socket = io("http://localhost:3001", {
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// ------------------ Provider ------------------
interface NotifyProviderProps {
  children: ReactNode;
}

const NotifyProvider: React.FC<NotifyProviderProps> = ({ children }) => {
  const [count, setCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [showList, setShowList] = useState<boolean>(false);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("connect", () => console.log("✅ Connected to Notification System"));
    socket.on("disconnect", () => console.warn("❌ Disconnected from Notification System"));

    const handleNewNotification = (data: NotificationData) => {
      setNotifications((prev) => [...prev, data]);
      setCount((prev) => prev + 1);
    };

    [
      "notification",
      "menuVisited",
      "reportVisited",
      "takequizVisited",
      "studentinfoVisited",
      "chatVisited",
      "courseVisited",
      "viewcourseVisited",
      "assignquizVisited",
      "dashboardVisited",
    ].forEach((event) => socket.on(event, handleNewNotification));

    return () => {
      [
        "notification",
        "menuVisited",
        "reportVisited",
        "takequizVisited",
        "studentinfoVisited",
        "chatVisited",
        "courseVisited",
        "viewcourseVisited",
        "assignquizVisited",
        "dashboardVisited",
      ].forEach((event) => socket.off(event, handleNewNotification));

      socket.disconnect();
    };
  }, []);

  // ------------------ Safe emitter helper ------------------
  const emitWhenConnected = (event: string, data: any) => {
    if (socket.connected) {
      socket.emit(event, data);
    } else {
      console.warn(`⚠️ Socket not connected, waiting to emit "${event}"...`);
      socket.once("connect", () => {
        console.log(`🔁 Emitting "${event}" after reconnect`);
        socket.emit(event, data);
      });
    }
  };

  // ------------------ Emitters ------------------
  const visitMenu = (menuName: string) =>
    emitWhenConnected("menuVisited", {
      page: menuName,
      message: `You visited the ${menuName} page`,
    });

  const visitReport = (pageName: string) =>
    emitWhenConnected("reportVisited", {
      page: pageName,
      message: `You visited the ${pageName} page`,
    });

  const takequizReport = (pageName: string) =>
    emitWhenConnected("takequizVisited", {
      page: pageName,
      message: `You visited the ${pageName} page`,
    });

  const studentinfoReport = (pageName: string) =>
    emitWhenConnected("studentinfoVisited", {
      page: pageName,
      message: `You visited the ${pageName} page`,
    });

  const chatReport = (pageName: string) =>
    emitWhenConnected("chatVisited", {
      page: pageName,
      message: `You visited the ${pageName} page`,
    });

  const courseReport = (pageName: string) =>
    emitWhenConnected("courseVisited", {
      page: pageName,
      message: `You visited the ${pageName} page`,
    });

  const viewcourseReport = (pageName: string) =>
    emitWhenConnected("viewcourseVisited", {
      page: pageName,
      message: `You visited the ${pageName} page`,
    });

  const assignquizReport = (pageName: string) =>
    emitWhenConnected("assignquizVisited", {
      page: pageName,
      message: `You visited the ${pageName} page`,
    });

  const dashboardReport = (pageName: string) =>
    emitWhenConnected("dashboardVisited", {
      page: pageName,
      message: `You visited the ${pageName} page`,
    });

  // ------------------ Helpers ------------------
  const showNotifications = () => {
    setShowList((prev) => !prev);
    resetCount();
  };

  const resetCount = () => setCount(0);

  return (
    <NotifyContext.Provider
      value={{
        count,
        notifications,
        resetCount,
        showNotifications,
        visitMenu,
        visitReport,
        takequizReport,
        studentinfoReport,
        chatReport,
        courseReport,
        viewcourseReport,
        assignquizReport,
        dashboardReport,
      }}
    >
      {children}

      {showList && (
        <NotificationList
          notifications={notifications}
          onClose={() => setShowList(false)}
        />
      )}
    </NotifyContext.Provider>
  );
};

export default NotifyProvider;
