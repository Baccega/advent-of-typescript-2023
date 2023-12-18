type FindSantaArray<T extends any[], Acc extends any[] = []> = T extends [
  infer Char extends any,
  ...infer Rest extends any[]
]
  ? Char extends "🎅🏼"
    ? Acc["length"]
    : FindSantaArray<Rest, [...Acc, Char]>
  : never;

type FindSantaMatrix<T extends any[][], Acc extends any[] = []> = T extends [
  infer Array extends any[],
  ...infer Rest extends any[][]
]
  ? FindSantaArray<Array> extends never
    ? FindSantaMatrix<Rest, [...Acc, Array]>
    : [Acc["length"], FindSantaArray<Array>]
  : never;
