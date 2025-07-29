import { z } from "zod";

export const validationFormSong = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  categoryId: z.number().min(1, "Category is required"),
  releaseDate: z
    .date()
    .min(new Date("1900-01-01"), "Release date must be at least 1900-01-01"),
  coverImage: z.string().min(1, "Cover image is required"),
});

export type FormSongType = z.infer<typeof validationFormSong>;
