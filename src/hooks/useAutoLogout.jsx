import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAutoLogout(timeout = 30000) {
  const navigate = useNavigate();

  useEffect(() => {
    const resetTimer = () => {
      localStorage.setItem("lastActivity", Date.now());
    };

    const checkInactivity = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (!lastActivity || Date.now() - lastActivity > timeout) {
        // Remove stored items and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("lastActivity");
        navigate("/login");
      }
    };

    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));

    const interval = setInterval(checkInactivity, 5000);

    // Set initial activity time
    resetTimer();

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      clearInterval(interval);
    };
  }, [navigate, timeout]);
}
