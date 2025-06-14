export type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends readonly (infer U)[] 
    ? U[] 
    : T[P] extends object 
      ? Mutable<T[P]> 
      : T[P];
};