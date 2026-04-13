import { createContext, useState, useContext, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "success", duration = 3000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const success = useCallback((msg) => addToast(msg, "success"), [addToast]);
    const error = useCallback((msg) => addToast(msg, "error"), [addToast]);
    const info = useCallback((msg) => addToast(msg, "info"), [addToast]);

    return (
        <ToastContext.Provider value={{ success, error, info }}>
            {children}

            {/* TOAST CONTAINER */}
            <div style={{
                position: "fixed",
                top: "24px",
                right: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: 9999,
                pointerEvents: "none"
            }}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        style={{
                            padding: "14px 22px",
                            borderRadius: "12px",
                            fontSize: "13px",
                            fontWeight: "500",
                            fontFamily: "inherit",
                            minWidth: "280px",
                            maxWidth: "400px",
                            pointerEvents: "auto",
                            animation: "fadeInUp 0.3s ease",
                            backdropFilter: "blur(20px)",
                            border: "1px solid",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                            ...(toast.type === "success" && {
                                background: "rgba(0, 214, 143, 0.12)",
                                color: "#00D68F",
                                borderColor: "rgba(0, 214, 143, 0.25)"
                            }),
                            ...(toast.type === "error" && {
                                background: "rgba(255, 71, 87, 0.12)",
                                color: "#FF4757",
                                borderColor: "rgba(255, 71, 87, 0.25)"
                            }),
                            ...(toast.type === "info" && {
                                background: "rgba(30, 144, 255, 0.12)",
                                color: "#4DA8FF",
                                borderColor: "rgba(30, 144, 255, 0.25)"
                            })
                        }}
                    >
                        {toast.type === "success" && "✅ "}
                        {toast.type === "error" && "⚠️ "}
                        {toast.type === "info" && "ℹ️ "}
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
