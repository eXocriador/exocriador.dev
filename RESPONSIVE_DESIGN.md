# Responsive Design Documentation

## Огляд

Цей сайт повністю оптимізований для роботи на всіх типах екранів з використанням сучасних CSS технологій та best practices.

## Breakpoints

### 🖥️ Large Desktop & 4K Screens (1920px+)

- **Максимальна ширина контенту**: 1800px
- **Збільшені шрифти**: base 18px, заголовки 56px-72px
- **Розширені відступи**: spacing-3xl (64px)
- **Оптимізовані grid'и**: більші картки та зображення

### 💻 Standard Desktop (1440px - 1919px)

- **Максимальна ширина контенту**: 1440px
- **Стандартні шрифти**: base 16px
- **Оптимальні відступи**: spacing-2xl (48px)

### 📱 Small Desktop & Large Tablets (1024px - 1439px)

- **Ширина секцій**: 94%
- **Адаптивні заголовки**: 42px-56px
- **Оптимізовані grid'и**: 3 колонки для tech stack

### 📱 Tablets (768px - 1023px)

- **Ширина секцій**: 95%
- **Мобільна навігація**: гамбургер меню
- **Адаптивні заголовки**: 36px-48px
- **Single column layout**: для Portfolio та Services

### 📱 Large Mobile (600px - 767px)

- **Ширина секцій**: 96%
- **Зменшені відступи**: spacing-xl (24px)
- **Оптимізовані кнопки**: touch-friendly розміри

### 📱 Mobile (480px - 599px)

- **Ширина секцій**: 98%
- **Мобільні шрифти**: base 14px, заголовки 32px-40px
- **Touch targets**: мінімум 44px для всіх клікабельних елементів

### 📱 Small Mobile (360px - 479px)

- **Ширина секцій**: 99%
- **Мінімальні шрифти**: base 13px, заголовки 28px-36px
- **Компактні відступи**: spacing-md (16px)

## Особливості Responsive Дизайну

### 🎯 Touch-Friendly Design

- **Мінімальний розмір кнопок**: 44px × 44px
- **Touch spacing**: 8px між елементами
- **Active states**: замість hover для touch пристроїв

### 📐 Flexible Grid Systems

- **CSS Grid з auto-fit**: автоматична адаптація колонок
- **Flexbox**: для вертикального вирівнювання
- **Aspect ratios**: для зображень та карток

### 🔤 Responsive Typography

- **Clamp() функції**: плавна масштабація шрифтів
- **Viewport units**: vw для адаптивних заголовків
- **Line heights**: оптимізовані для різних розмірів

### 🎨 Adaptive Visual Elements

- **Responsive backgrounds**: різні розміри градієнтів
- **Scalable icons**: адаптивні розміри іконок
- **Flexible spacing**: пропорційні відступи

## Компоненти та їх Responsive Поведінка

### Header

- **Desktop**: горизонтальна навігація з CTA кнопкою
- **Tablet**: гамбургер меню з overlay
- **Mobile**: компактний логотип та меню

### Hero Section

- **Desktop**: повноекранна висота з великими заголовками
- **Tablet**: адаптивні шрифти та кнопки
- **Mobile**: вертикальне розташування CTA кнопок

### Portfolio Grid

- **Desktop**: 3-4 колонки з великими картками
- **Tablet**: 2 колонки з середніми картками
- **Mobile**: 1 колонка з компактними картками

### Services Cards

- **Desktop**: 3 колонки з детальним описом
- **Tablet**: 2 колонки з оптимізованим контентом
- **Mobile**: 1 колонка з компактним дизайном

### About Section

- **Desktop**: 2 колонки (текст + фото)
- **Tablet**: 1 колонка з центрованим фото
- **Mobile**: вертикальне розташування з адаптивними tech tags

### Footer

- **Desktop**: горизонтальне розташування елементів
- **Tablet**: компактні відступи та розміри
- **Mobile**: вертикальне розташування з touch-friendly кнопками

## Landscape Mobile Optimization

### 📱 Landscape Mode (max-height: 500px)

- **Компактні заголовки**: зменшені розміри шрифтів
- **Оптимізовані відступи**: мінімальні spacing
- **Горизонтальні grid'и**: для кращого використання простору

## Accessibility Features

### ♿ Reduced Motion

- **prefers-reduced-motion**: відключення анімацій
- **Static alternatives**: для користувачів з чутливістю

### 🎨 High Contrast

- **prefers-contrast: high**: посилені границі
- **Enhanced shadows**: краща видимість елементів

### 🌓 Color Scheme

- **prefers-color-scheme**: підтримка світлої/темної теми
- **System integration**: автоматичне перемикання

## Performance Optimizations

### 🚀 High DPI Displays

- **Retina optimization**: crisp-edges для зображень
- **Optimized rendering**: для 4K та high-DPI екранів

### 📱 Touch Device Optimization

- **Pointer detection**: різні стилі для touch/mouse
- **Touch targets**: мінімальні розміри для пальців

## CSS Variables для Responsive Дизайну

```css
:root {
  /* Responsive spacing */
  --spacing-3xl: 64px; /* Desktop */
  --spacing-2xl: 48px; /* Tablet */
  --spacing-xl: 32px; /* Mobile */

  /* Responsive typography */
  --font-size-base: 16px; /* Desktop */
  --font-size-base: 15px; /* Tablet */
  --font-size-base: 14px; /* Mobile */

  /* Responsive layout */
  --section-width: 90%; /* Desktop */
  --section-width: 95%; /* Tablet */
  --section-width: 98%; /* Mobile */
}
```

## Testing Checklist

### ✅ Desktop (1920px+)

- [ ] Всі секції мають правильні відступи
- [ ] Grid системи показують оптимальну кількість колонок
- [ ] Шрифти читабельні та пропорційні

### ✅ Tablet (768px - 1023px)

- [ ] Mobile меню працює коректно
- [ ] Grid системи адаптуються до 2 колонок
- [ ] Touch targets мають мінімум 44px

### ✅ Mobile (480px - 767px)

- [ ] Вертикальне розташування елементів
- [ ] Кнопки та посилання touch-friendly
- [ ] Шрифти читабельні на малих екранах

### ✅ Small Mobile (360px - 479px)

- [ ] Контент поміщається без горизонтального скролу
- [ ] Мінімальні розміри для всіх інтерактивних елементів
- [ ] Компактне розташування без втрати функціональності

### ✅ Landscape Mobile

- [ ] Оптимізоване використання горизонтального простору
- [ ] Компактні заголовки та відступи
- [ ] Touch-friendly розміри елементів

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari 14+
- ✅ Chrome Mobile 90+

## Best Practices

1. **Mobile-First Approach**: починаємо з мобільної версії
2. **Progressive Enhancement**: додаємо функції для більших екранів
3. **Touch-Friendly**: мінімум 44px для всіх клікабельних елементів
4. **Performance**: оптимізовані зображення та анімації
5. **Accessibility**: підтримка screen readers та keyboard navigation

## Maintenance

- Регулярно тестувати на різних пристроях
- Оновлювати breakpoints при зміні дизайну
- Моніторити Core Web Vitals для різних розмірів екранів
- Тестувати на реальних пристроях користувачів
