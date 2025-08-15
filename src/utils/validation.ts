import { z } from "zod";
import { FormData } from "../types";

// Схема валідації форми контакту
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Ім'я має бути не менше 2 символів")
    .max(50, "Ім'я має бути не більше 50 символів")
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇєЄ\s'-]+$/,
      "Ім'я може містити тільки літери, пробіли, дефіси та апострофи"
    ),
  email: z
    .string()
    .email("Введіть коректну email адресу")
    .min(5, "Email має бути не менше 5 символів")
    .max(100, "Email має бути не більше 100 символів"),
  message: z
    .string()
    .min(10, "Повідомлення має бути не менше 10 символів")
    .max(1000, "Повідомлення має бути не більше 1000 символів")
    .regex(
      /^[^<>{}]*$/,
      "Повідомлення не може містити HTML теги або спеціальні символи"
    )
});

// Тип для помилок форми
export type FormErrors = {
  [K in keyof FormData]?: string;
};

// Функція валідації окремого поля
export const validateField = (
  name: keyof FormData,
  value: string
): string | undefined => {
  if (name === "name") {
    if (!value || value.trim() === "") {
      return "Ім'я обов'язкове";
    }
    if (value.trim().length < 2) {
      return "Ім'я має бути не менше 2 символів";
    }
    return undefined;
  } else if (name === "email") {
    // Спрощена валідація email
    if (!value || value.trim() === "") {
      return "Email обов'язковий";
    }
    // Проста перевірка на наявність @ та крапки
    if (!value.includes("@") || !value.includes(".")) {
      return "Введіть коректну email адресу";
    }
    return undefined;
  } else if (name === "message") {
    if (!value || value.trim() === "") {
      return "Повідомлення обов'язкове";
    }
    if (value.trim().length < 10) {
      return "Повідомлення має бути не менше 10 символів";
    }
    return undefined;
  }
  return undefined;
};

// Функція валідації всієї форми
export const validateForm = (formData: FormData): FormErrors => {
  const newErrors: FormErrors = {};

  // Валідація імені
  if (!formData.name || formData.name.trim() === "") {
    newErrors.name = "Ім'я обов'язкове";
  } else if (formData.name.trim().length < 2) {
    newErrors.name = "Ім'я має бути не менше 2 символів";
  }

  // Валідація email
  if (!formData.email || formData.email.trim() === "") {
    newErrors.email = "Email обов'язковий";
  } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
    newErrors.email = "Введіть коректну email адресу";
  }

  // Валідація повідомлення
  if (!formData.message || formData.message.trim() === "") {
    newErrors.message = "Повідомлення обов'язкове";
  } else if (formData.message.trim().length < 10) {
    newErrors.message = "Повідомлення має бути не менше 10 символів";
  }

  return newErrors;
};

// Функція перевірки чи форма валідна
export const isFormValid = (
  formData: FormData,
  errors: FormErrors
): boolean => {
  const hasNoErrors = Object.keys(errors).length === 0;
  const allFieldsFilled =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  console.log("Validation check:", {
    formData,
    errors,
    hasNoErrors,
    allFieldsFilled,
    nameValid: formData.name.trim() !== "",
    emailValid: formData.email.trim() !== "",
    messageValid: formData.message.trim() !== ""
  });

  return hasNoErrors && allFieldsFilled;
};
