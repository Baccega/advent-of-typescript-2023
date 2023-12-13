type Fill<
  T extends number,
  Acc extends Array<number> = []
> = T extends Acc["length"] ? Acc[number] : Fill<T, [...Acc, Acc["length"]]>;

type DayCounter<Start extends number, End extends number> =
  | Exclude<Fill<End>, Fill<Start>>
  | End;
