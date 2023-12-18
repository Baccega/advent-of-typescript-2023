type Count<
  Sack extends string[],
  Search extends string,
  Acc extends string[] = []
> = Sack extends [infer Head extends string, ...infer Rest extends string[]]
  ? Head extends Search
    ? Count<Rest, Search, [...Acc, Head]>
    : Count<Rest, Search, Acc>
  : Acc["length"];
