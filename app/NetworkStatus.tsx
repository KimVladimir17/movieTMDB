"use client";

import { useEffect, useState } from "react";
import { Alert } from "antd";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => setIsOnline(true);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <Alert
      message="There is no internet connection"
      description="Check your connection"
      type="warning"
      showIcon
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    />
  );
}
