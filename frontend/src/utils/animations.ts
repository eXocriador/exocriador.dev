/**
 * Утиліта для плавних анімацій без блимання
 */

/**
 * Перевіряє, чи підтримуються анімації
 */
export function supportsAnimations(): boolean {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
