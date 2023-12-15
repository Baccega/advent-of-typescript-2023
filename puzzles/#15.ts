type SingleBox<
  Toy extends string,
  N extends number,
  Acc extends Array<string> = []
> = N extends Acc["length"] ? Acc : SingleBox<Toy, N, [...Acc, Toy]>;

type BoxToys<TName extends string, TNumber extends number> = SingleBox<
  TName,
  TNumber
>;
