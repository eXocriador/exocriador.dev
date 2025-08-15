// Утиліта для моніторингу продуктивності скролу та FPS

interface PerformanceMetrics {
  fps: number;
  scrollTime: number;
  frameTime: number;
  memoryUsage?: number;
}

class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;
  private scrollStartTime = 0;
  private isScrolling = false;
  private frameTimes: number[] = [];
  private maxFrameTimes = 60; // Зберігаємо останні 60 кадрів

  constructor() {
    this.init();
  }

  private init() {
    // Моніторинг FPS
    this.monitorFPS();
    
    // Моніторинг скролу
    this.monitorScroll();
    
    // Моніторинг пам'яті (якщо доступно)
    this.monitorMemory();
  }

  private monitorFPS() {
    const measureFPS = () => {
      const currentTime = performance.now();
      this.frameCount++;
      
      if (currentTime - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
        
        // Логуємо FPS кожну секунду
        if (this.fps < 30) {
          console.warn(`Low FPS detected: ${this.fps}fps`);
        }
      }
      
      // Вимірюємо час кадру
      const frameStart = performance.now();
      requestAnimationFrame(() => {
        const frameTime = performance.now() - frameStart;
        this.frameTimes.push(frameTime);
        
        if (this.frameTimes.length > this.maxFrameTimes) {
          this.frameTimes.shift();
        }
        
        // Попереджаємо про повільні кадри
        if (frameTime > 16.67) { // Більше 60fps
          console.warn(`Slow frame detected: ${frameTime.toFixed(2)}ms`);
        }
      });
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  private monitorScroll() {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScrollStart = () => {
      if (!this.isScrolling) {
        this.isScrolling = true;
        this.scrollStartTime = performance.now();
      }
      
      clearTimeout(scrollTimeout);
    };
    
    const handleScrollEnd = () => {
      scrollTimeout = setTimeout(() => {
        if (this.isScrolling) {
          this.isScrolling = false;
          const scrollDuration = performance.now() - this.scrollStartTime;
          
          if (scrollDuration > 100) {
            console.warn(`Long scroll detected: ${scrollDuration.toFixed(2)}ms`);
          }
        }
      }, 150);
    };
    
    window.addEventListener('scroll', handleScrollStart, { passive: true });
    window.addEventListener('scroll', handleScrollEnd, { passive: true });
  }

  private monitorMemory() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
        
        if (usedMB > 100) { // Попереджаємо про високе використання пам'яті
          console.warn(`High memory usage: ${usedMB}MB / ${totalMB}MB`);
        }
      }, 5000);
    }
  }

  // Отримання поточних метрик
  public getMetrics(): PerformanceMetrics {
    const avgFrameTime = this.frameTimes.length > 0 
      ? this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length 
      : 0;

    const metrics: PerformanceMetrics = {
      fps: this.fps,
      scrollTime: this.isScrolling ? performance.now() - this.scrollStartTime : 0,
      frameTime: avgFrameTime
    };

    // Додаємо інформацію про пам'ять, якщо доступно
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      metrics.memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024);
    }

    return metrics;
  }

  // Перевірка, чи потрібна оптимізація
  public needsOptimization(): boolean {
    const metrics = this.getMetrics();
    return metrics.fps < 30 || metrics.frameTime > 16.67;
  }

  // Рекомендації по оптимізації
  public getOptimizationTips(): string[] {
    const tips: string[] = [];
    const metrics = this.getMetrics();
    
    if (metrics.fps < 30) {
      tips.push('FPS занадто низький - перевірте TSParticles налаштування');
      tips.push('Зменшіть кількість анімацій під час скролу');
    }
    
    if (metrics.frameTime > 16.67) {
      tips.push('Кадри занадто повільні - оптимізуйте CSS анімації');
      tips.push('Використовуйте transform замість top/left для анімацій');
    }
    
    if (metrics.memoryUsage && metrics.memoryUsage > 100) {
      tips.push('Високе використання пам\'яті - перевірте memory leaks');
    }
    
    return tips;
  }

  // Логування метрик
  public logMetrics() {
    const metrics = this.getMetrics();
    console.group('Performance Metrics');
    console.log(`FPS: ${metrics.fps}`);
    console.log(`Frame Time: ${metrics.frameTime.toFixed(2)}ms`);
    console.log(`Scroll Time: ${metrics.scrollTime.toFixed(2)}ms`);
    if (metrics.memoryUsage) {
      console.log(`Memory: ${metrics.memoryUsage}MB`);
    }
    console.groupEnd();
  }
}

// Створюємо глобальний екземпляр
export const performanceMonitor = new PerformanceMonitor();

// Експортуємо функції для зручності
export const getPerformanceMetrics = () => performanceMonitor.getMetrics();
export const checkPerformance = () => performanceMonitor.needsOptimization();
export const getOptimizationTips = () => performanceMonitor.getOptimizationTips();
export const logPerformance = () => performanceMonitor.logMetrics();
