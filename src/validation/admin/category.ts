import { z } from "zod";


export const validationFormCategory = z.object({
    name: z.string().min(1, "Name of category is required"),
});


export type CategoryFormType = z.infer<typeof validationFormCategory>;