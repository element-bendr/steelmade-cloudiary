import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import type { CloudinaryImage, ImageOptions } from '../types';
import { CloudinaryImageSchema, ImageOptionsSchema } from '../types';
import { ValidationService } from '@modules/shared';

export const ImageService = {
  transform: (image: CloudinaryImage, options: ImageOptions): E.Either<Error, CloudinaryImage> =>    pipe(
      ValidationService.validate(ImageOptionsSchema)(options),
      E.mapLeft(err => new Error(err.message)),
      E.chain(() => pipe(
        ValidationService.validate(CloudinaryImageSchema)(image),
        E.mapLeft(err => new Error(err.message))
      )),
      E.map(validImage => ({
        ...validImage,
        url: transformUrl(validImage.url, options)
      }))
    ),

  optimize: (image: CloudinaryImage): E.Either<Error, CloudinaryImage> =>
    ImageService.transform(image, {
      format: 'webp',
      quality: 85
    }),

  resize: (width: number, height?: number) =>
    (image: CloudinaryImage): E.Either<Error, CloudinaryImage> =>
      ImageService.transform(image, { width, height })
};

const transformUrl = (url: string, options: ImageOptions): string => {
  const params = new URLSearchParams();
  if (options.width) params.append('w', options.width.toString());
  if (options.height) params.append('h', options.height.toString());
  if (options.quality) params.append('q', options.quality.toString());
  if (options.format) params.append('f', options.format);
  if (options.blur) params.append('blur', options.blur.toString());
  
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?${params.toString()}`;
};