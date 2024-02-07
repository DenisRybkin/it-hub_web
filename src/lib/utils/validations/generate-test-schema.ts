import * as z from 'zod';

export const GenerateTestSchema = z.object({
  count: z.number().min(1).max(5),
  topic: z.string().nonempty('validation:error.field_required').min(3),
});
