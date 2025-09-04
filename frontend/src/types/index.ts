import React from "react";

// Основні типи для проєкту
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

export interface ServiceData {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  features: string[];
}

export interface AboutContent {
  title: string;
  narrative: string;
  description: string[];
  techStackTitle: string;
  principles: Array<{
    icon: string;
    text: string;
    description: string;
  }>;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}
