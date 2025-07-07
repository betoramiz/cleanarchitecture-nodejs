import { z } from "zod"

const userRequestSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export default userRequestSchema;