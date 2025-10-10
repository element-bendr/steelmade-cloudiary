import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import type { ImageTransformation, CloudinaryImage, ImageConfig } from '../types';
import { ImageTransformationSchema } from '../types';

export const ImageTransformationService = {
  config: {} as ImageConfig,

  init: (config: ImageConfig): ImageConfig => {
    ImageTransformationService.config = config;
    return config;
  },

  buildUrl: (image: CloudinaryImage): E.Either<Error, string> =>
    pipe(
      image,
      O.fromNullable,
      O.fold(
        () => E.left(new Error('Invalid image data')),
        (img) => E.right(
          `https://res.cloudinary.com/${ImageTransformationService.config.cloudName}/image/upload/${
            img.transformation ? buildTransformationString(img.transformation) : ''
          }/${img.publicId}`
        )
      )
    ),

  applyTransformation: (image: CloudinaryImage, transformation: ImageTransformation): E.Either<Error, CloudinaryImage> =>
    pipe(
      transformation,
      ImageTransformationSchema.safeParse,
      (result) => result.success
        ? E.right({ ...image, transformation })
        : E.left(new Error('Invalid transformation parameters'))
    )
};

const buildTransformationString = (transformation: ImageTransformation): string => {
  const params: string[] = [];
  
  if (transformation.width) params.push(`w_${transformation.width}`);
  if (transformation.height) params.push(`h_${transformation.height}`);
  if (transformation.quality) params.push(`q_${transformation.quality}`);
  if (transformation.format) params.push(`f_${transformation.format}`);
  if (transformation.crop) params.push(`c_${transformation.crop}`);
  
  return params.join(',');
};