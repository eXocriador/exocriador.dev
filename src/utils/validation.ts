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
  try {
    if (name === "name") {
      contactFormSchema.shape.name.parse(value);
    } else if (name === "email") {
      contactFormSchema.shape.email.parse(value);
    } else if (name === "message") {
      contactFormSchema.shape.message.parse(value);
    }
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (error as z.ZodError).errors[0]?.message;
    }
    return "Невідома помилка валідації";
  }
};

// Функція валідації всієї форми
export const validateForm = (formData: FormData): FormErrors => {
  try {
    contactFormSchema.parse(formData);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: FormErrors = {};
      (error as z.ZodError).errors.forEach((err: z.ZodIssue) => {
        const field = err.path[0] as keyof FormData;
        newErrors[field] = err.message;
      });
      return newErrors;
    }
    return { name: "Невідома помилка валідації" };
  }
};

// Функція перевірки чи форма валідна
export const isFormValid = (
  formData: FormData,
  errors: FormErrors
): boolean => {
  return (
    Object.keys(errors).length === 0 &&
    Object.values(formData).every((value) => value.trim() !== "")
  );
};
