

import { z } from "zod";

export type InferFormInput<T extends z.ZodTypeAny> = z.infer<T>;

