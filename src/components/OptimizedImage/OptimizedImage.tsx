import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  generateImageUrls,
  generateBlurPlaceholderUrl
} from "../../utils/imageOptimization";
import styles from "./OptimizedImage.module.css";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Для важливих зображень (above the fold)
  placeholder?: string; // Кастомний placeholder
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  const imgRef = useRef<HTMLImageElement>(null);

  // Використовуємо Intersection Observer для lazy loading
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px" // Завантажуємо зображення за 50px до появи
  });

  // Генеруємо оптимізовані URL для зображення
  const imageUrls = generateImageUrls(src);

  useEffect(() => {
    if (inView && !imageSrc) {
      if (priority) {
        // Для важливих зображень завантажуємо одразу
        setImageSrc(src);
      } else {
        // Для інших - тільки коли вони в зоні видимості
        setImageSrc(src);
      }
    }
  }, [inView, src, imageSrc, priority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    onError?.();
  };

  // Об'єднуємо refs
  const setRefs = (element: HTMLDivElement | null) => {
    inViewRef(element);
    if (imgRef.current) {
      imgRef.current = element?.querySelector("img") || null;
    }
  };

  const blurPlaceholder = placeholder || imageUrls.placeholder;

  return (
    <div
      ref={setRefs}
      className={`${styles.imageContainer} ${className}`}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {!isLoaded && !hasError && (
        <div className={styles.placeholderContainer}>
          <img
            src={blurPlaceholder}
            alt=""
            className={styles.blurPlaceholder}
            aria-hidden="true"
          />
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      )}

      {/* Основне зображення */}
      {imageSrc && (
        <picture>
          {/* WebP формат для браузерів, що підтримують */}
          <source srcSet={imageUrls.formats.webp} type="image/webp" />
          {/* AVIF формат для браузерів, що підтримують */}
          <source srcSet={imageUrls.formats.avif} type="image/avif" />
          {/* Fallback JPEG */}
          <img
            ref={imgRef}
            src={imageUrls.formats.jpg}
            alt={alt}
            className={`${styles.optimizedImage} ${
              isLoaded ? styles.loaded : ""
            }`}
            loading={priority ? "eager" : "lazy"}
            srcSet={imageUrls.srcSet}
            sizes={imageUrls.sizes}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ width, height }}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>📷</div>
          <p className={styles.errorText}>Зображення не завантажилося</p>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
