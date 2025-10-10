import { z } from 'zod';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

const EnvSchema = z.object({
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string()
});

export const getEnvConfig = () => 
  pipe(
    EnvSchema.safeParse(process.env),
    E.fromPredicate(
      (result): result is z.SafeParseSuccess<z.infer<typeof EnvSchema>> => result.success,
      () => new Error('Missing required environment variables')
    ),
    E.map(result => result.data)
  );