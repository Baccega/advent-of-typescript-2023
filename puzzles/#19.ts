type CreateGiftArray<
  Gift extends string,
  Length extends number,
  Acc extends string[] = []
> = Acc["length"] extends Length
  ? Acc
  : CreateGiftArray<Gift, Length, [...Acc, Gift]>;

type Rebuild<T extends number[], Acc extends string[][] = []> = T extends [
  infer Head extends number,
  ...infer Rest extends number[]
]
  ? Rebuild<Rest, [...Acc, CreateGiftArray<GetGift<Acc["length"]>, Head>]>
  : Unroll<Acc>;

type Unroll<T extends string[][], Acc extends string[] = []> = T extends [
  infer Head extends string[],
  ...infer Rest extends string[][]
]
  ? Unroll<Rest, [...Acc, ...Head]>
  : Acc;

type GetGift<
  N extends number,
  Cur extends string = "🛹",
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Cur
  : Cur extends "🏄"
  ? GetGift<N, "🛹", [...Acc, 0]>
  : Cur extends "🛹"
  ? GetGift<N, "🚲", [...Acc, 0]>
  : Cur extends "🚲"
  ? GetGift<N, "🛴", [...Acc, 0]>
  : GetGift<N, "🏄", [...Acc, 0]>;
