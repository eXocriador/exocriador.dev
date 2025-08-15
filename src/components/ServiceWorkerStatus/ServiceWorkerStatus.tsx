import React, { useState, useEffect } from "react";
import {
  getServiceWorkerStatus,
  updateServiceWorker
} from "../../utils/serviceWorkerRegistration";
import styles from "./ServiceWorkerStatus.module.css";

const ServiceWorkerStatus: React.FC = () => {
  const [status, setStatus] = useState(getServiceWorkerStatus());
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const updateStatus = () => setStatus(getServiceWorkerStatus());

    // Оновлюємо статус при зміні
    window.addEventListener("focus", updateStatus);
    navigator.serviceWorker?.addEventListener("controllerchange", updateStatus);

    return () => {
      window.removeEventListener("focus", updateStatus);
      navigator.serviceWorker?.removeEventListener(
        "controllerchange",
        updateStatus
      );
    };
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateServiceWorker();
      setTimeout(() => {
        setStatus(getServiceWorkerStatus());
        setIsUpdating(false);
      }, 1000);
    } catch (error) {
      console.error("Помилка оновлення:", error);
      setIsUpdating(false);
    }
  };

  // Показуємо тільки в development або якщо є активний Service Worker
  if (!status.isSupported || (!status.isRegistered && !status.isDevMode)) {
    return null;
  }

  return (
    <div className={styles.statusContainer}>
      <div className={styles.statusInfo}>
        <span className={styles.statusLabel}>Service Worker:</span>
        <span
          className={`${styles.statusValue} ${
            styles[status.isRegistered ? "active" : "inactive"]
          }`}
        >
          {status.isDevMode
            ? "DEV Mode"
            : status.isRegistered
            ? "Active"
            : "Inactive"}
        </span>
      </div>

      {status.isRegistered && !status.isDevMode && (
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className={styles.updateButton}
          aria-label="Update Service Worker"
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      )}
    </div>
  );
};

export default ServiceWorkerStatus;
