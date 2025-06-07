// This is the base type for all image assets in the application
export interface ImageAsset {
  url: string;
  width: number;
  height: number;
  alt: string; // Making alt property required for accessibility
}
