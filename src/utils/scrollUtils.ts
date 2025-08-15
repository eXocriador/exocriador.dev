/**
 * Utility functions for smooth scrolling navigation
 */

export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};

export const scrollToContact = (): void => {
  scrollToSection("contact");
};
