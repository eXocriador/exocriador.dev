// Font loading utility to prevent FOUT (Flash of Unstyled Text)
export class FontLoader {
  private static instance: FontLoader;
  private fontsLoaded = false;

  private constructor() {}

  public static getInstance(): FontLoader {
    if (!FontLoader.instance) {
      FontLoader.instance = new FontLoader();
    }
    return FontLoader.instance;
  }

  public async loadFonts(): Promise<void> {
    if (this.fontsLoaded) return;

    try {
      // Check if fonts are already loaded
      if (document.fonts && document.fonts.check) {
        const fontFaces = [
          '400 16px "Space Grotesk"',
          '500 16px "Space Grotesk"',
          '600 16px "Space Grotesk"',
          '700 16px "Space Grotesk"'
        ];

        const allFontsLoaded = fontFaces.every(font => document.fonts.check(font));

        if (allFontsLoaded) {
          this.showContent();
          return;
        }
      }

      // Load fonts using FontFace API if available
      if (document.fonts && document.fonts.load) {
        const fontPromises = [
          document.fonts.load('400 16px "Space Grotesk"'),
          document.fonts.load('500 16px "Space Grotesk"'),
          document.fonts.load('600 16px "Space Grotesk"'),
          document.fonts.load('700 16px "Space Grotesk"')
        ];

        await Promise.all(fontPromises);
      } else {
        // Fallback: wait for a short time for fonts to load
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      this.showContent();
    } catch (error) {
      console.warn('Font loading failed, showing content anyway:', error);
      this.showContent();
    }
  }

  private showContent(): void {
    this.fontsLoaded = true;
    document.body.classList.remove('fonts-loading');
    document.body.classList.add('fonts-loaded');
  }

  public init(): void {
    // Add loading class initially
    document.body.classList.add('fonts-loading');

    // Start loading fonts
    this.loadFonts();
  }
}

// Initialize font loader when DOM is ready
export const initFontLoader = (): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      FontLoader.getInstance().init();
    });
  } else {
    FontLoader.getInstance().init();
  }
};
