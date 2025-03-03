
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const getApiRoute = (path: string) => {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const startwellColors = {
  purple: '#673AB7',
  yellow: '#FFCA28',
  orange: '#FF9800',
  lavender: '#E1D4F3',
}

export const getStartwellColor = (color: keyof typeof startwellColors) => {
  return startwellColors[color];
};
