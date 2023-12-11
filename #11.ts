type MakeReadonly<
  T extends ReadonlyArray<any>,
  Acc extends ReadonlyArray<any> = []
> = T["length"] extends Acc["length"]
  ? Acc
  : MakeReadonly<T, readonly [...Acc, SantaListProtector<T[Acc["length"]]>]>;

type SantaListProtector<T> = T extends Record<string, unknown>
  ? {
      readonly [K in keyof T]: T[K] extends any[]
        ? MakeReadonly<T[K]>
        : SantaListProtector<T[K]>;
    }
  : T;
