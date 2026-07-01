import { z } from "zod";

export const recipeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(5, "Description is required"),

  ingredients: z
    .string()
    .min(2, "Ingredients are required"),

  category: z
    .string()
    .min(1, "Please select category"),
});