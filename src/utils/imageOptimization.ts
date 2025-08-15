// Утиліти для оптимізації зображень

export interface ImageSize {
  width: number;
  height: number;
  suffix: string;
}

export interface ImageFormats {
  webp?: string;
  avif?: string;
  jpg: string;
}

// Стандартні розміри для різних пристроїв
export const IMAGE_SIZES: ImageSize[] = [
  { width: 400, height: 250, suffix: "sm" }, // Mobile
  { width: 600, height: 375, suffix: "md" }, // Tablet
  { width: 800, height: 500, suffix: "lg" }, // Desktop
  { width: 1200, height: 750, suffix: "xl" } // Large screens
];

// Розміри для blur placeholder
export const PLACEHOLDER_SIZES: ImageSize[] = [
  { width: 20, height: 20, suffix: "placeholder" },
  { width: 40, height: 40, suffix: "placeholder-2x" }
];

/**
 * Генерує оптимізовані URL для зображень Unsplash
 */
export const generateOptimizedImageUrl = (
  originalUrl: string,
  size: ImageSize,
  format: "webp" | "avif" | "jpg" = "jpg",
  quality: number = 80
): string => {
  try {
    const url = new URL(originalUrl);

    // Додаємо параметри оптимізації
    url.searchParams.set("w", size.width.toString());
    url.searchParams.set("h", size.height.toString());
    url.searchParams.set("fit", "crop");
    url.searchParams.set("crop", "center");
    url.searchParams.set("q", quality.toString());

    // Додаємо формат
    if (format === "webp") {
      url.searchParams.set("fm", "webp");
    } else if (format === "avif") {
      url.searchParams.set("fm", "avif");
    }

    return url.toString();
  } catch (error) {
    console.warn("Failed to optimize image URL:", error);
    return originalUrl;
  }
};

/**
 * Генерує blur placeholder URL
 */
export const generateBlurPlaceholderUrl = (originalUrl: string): string => {
  return generateOptimizedImageUrl(
    originalUrl,
    PLACEHOLDER_SIZES[0]!,
    "jpg",
    10
  );
};

/**
 * Генерує srcset для responsive зображень
 */
export const generateSrcSet = (originalUrl: string): string => {
  return IMAGE_SIZES.map((size) => {
    const url = generateOptimizedImageUrl(originalUrl, size);
    return `${url} ${size.width}w`;
  }).join(", ");
};

/**
 * Генерує sizes атрибут для responsive зображень
 */
export const generateSizes = (): string => {
  return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
};

/**
 * Перевіряє, чи підтримує браузер WebP
 */
export const supportsWebP = (): boolean => {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};

/**
 * Перевіряє, чи підтримує браузер AVIF
 */
export const supportsAVIF = (): boolean => {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0;
};

/**
 * Отримує оптимальний формат для браузера
 */
export const getOptimalFormat = (): "webp" | "avif" | "jpg" => {
  if (supportsAVIF()) return "avif";
  if (supportsWebP()) return "webp";
  return "jpg";
};

/**
 * Генерує всі необхідні URL для зображення
 */
export const generateImageUrls = (originalUrl: string) => {
  const optimalFormat = getOptimalFormat();

  return {
    src: generateOptimizedImageUrl(originalUrl, IMAGE_SIZES[1]!, optimalFormat),
    srcSet: generateSrcSet(originalUrl),
    sizes: generateSizes(),
    placeholder: generateBlurPlaceholderUrl(originalUrl),
    formats: {
      webp: generateOptimizedImageUrl(originalUrl, IMAGE_SIZES[1]!, "webp"),
      avif: generateOptimizedImageUrl(originalUrl, IMAGE_SIZES[1]!, "avif"),
      jpg: generateOptimizedImageUrl(originalUrl, IMAGE_SIZES[1]!, "jpg")
    }
  };
};

/**
 * Preload важливі зображення
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Preload кілька зображень
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(urls.map((url) => preloadImage(url)));
};
