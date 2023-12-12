type FindSanta<T extends any[], Acc extends any[] = []> = T extends [
  infer Char extends any,
  ...infer Rest extends any[]
]
  ? Char extends "🎅🏼"
    ? Acc["length"]
    : FindSanta<Rest, [...Acc, Char]>
  : never;
