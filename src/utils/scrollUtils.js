export const scrollToSection = (targetId) => {
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    // Знаходимо хедер
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;

    // Розраховуємо позицію з урахуванням висоти хедера
    const targetPosition = targetSection.offsetTop - headerHeight - 20;

    // Плавно прокручуємо до секції
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }
};
