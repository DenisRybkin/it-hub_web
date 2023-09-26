import * as z from 'zod';

export const RegistrationSchema = z
  .object({
    nickname: z
      .string()
      .nonempty('validation:error.field_required')
      .min(3, 'validation:error.min_char_number'),
    name: z
      .string()
      .nonempty('validation:error.field_required')
      .min(3, 'validation:error.min_char_number'),
    email: z
      .string()
      .nonempty('validation:error.field_required')
      .email('validation:error.wrong_email')
      .min(6, 'validation:error.min_char_number'),
    password: z
      .string()
      .nonempty('validation:error.field_required')
      .min(6, 'validation:error.min_char_number'),
    passwordConfirm: z
      .string()
      .nonempty('validation:error.field_required')
      .min(6, 'validation:error.min_char_number'),
  })
  .refine(data => data.password == data.passwordConfirm, {
    message: 'validation:error.passwords_no_match',
    path: ['passwordConfirm'],
  });
