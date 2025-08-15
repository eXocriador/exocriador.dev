// Утиліта для реєстрації Service Worker з перевіркою dev режиму

export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    // Перевіряємо, чи підтримується Service Worker
    if (!("serviceWorker" in navigator)) {
      console.log("Service Worker не підтримується в цьому браузері");
      return null;
    }

    // Перевіряємо, чи ми в dev режимі
    const isDevMode =
      import.meta.env.DEV ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.protocol === "http:";

    if (isDevMode) {
      console.log(
        "DEV режим: Service Worker не реєструється для уникнення конфліктів з Vite"
      );
      return null;
    }

    try {
      console.log("Реєструємо Service Worker для production...");

      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/"
      });

      console.log("Service Worker успішно зареєстрований:", registration);

      // Слухаємо оновлення Service Worker
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("Нова версія Service Worker доступна");
              // Тут можна показати користувачу повідомлення про оновлення
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error("Помилка реєстрації Service Worker:", error);
      return null;
    }
  };

export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (!("serviceWorker" in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.unregister();
      console.log("Service Worker успішно видалено");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Помилка видалення Service Worker:", error);
    return false;
  }
};

// Функція для перевірки статусу Service Worker
export const getServiceWorkerStatus = (): {
  isSupported: boolean;
  isRegistered: boolean;
  isDevMode: boolean;
} => {
  const isSupported = "serviceWorker" in navigator;
  const isDevMode =
    import.meta.env.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.protocol === "http:";

  return {
    isSupported,
    isRegistered: isSupported && !!navigator.serviceWorker.controller,
    isDevMode
  };
};

// Функція для оновлення Service Worker
export const updateServiceWorker = async (): Promise<boolean> => {
  if (!("serviceWorker" in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log("Service Worker оновлення запущено");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Помилка оновлення Service Worker:", error);
    return false;
  }
};
