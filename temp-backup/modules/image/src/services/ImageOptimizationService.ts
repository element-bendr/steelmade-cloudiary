import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import type { CloudinaryImage, ImageOptions } from '../types';
import { ImageService } from './ImageService';

export const ImageOptimizationService = {  optimizeBatch: (images: readonly CloudinaryImage[]): E.Either<Error, CloudinaryImage[]> =>
    pipe(
      images,
      E.traverseArray((img: CloudinaryImage) => ImageService.optimize(img)),
      E.map(imgs => [...imgs])
    ),
  resizeBatch: (width: number, height?: number) =>
    (images: readonly CloudinaryImage[]): E.Either<Error, CloudinaryImage[]> =>
      pipe(
        images,
        E.traverseArray((img: CloudinaryImage) => ImageService.resize(width, height)(img)),
        E.map((imgs: readonly CloudinaryImage[]) => Array.from(imgs))
      )
};