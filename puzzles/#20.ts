type Letters = {
  A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
  B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
  C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
  E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
  H: ["█ █ ", "█▀█ ", "▀ ▀ "];
  I: ["█ ", "█ ", "▀ "];
  M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
  N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
  P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
  R: ["█▀█ ", "██▀ ", "▀ ▀ "];
  S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
  T: ["▀█▀ ", "░█ ░", "░▀ ░"];
  Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
  W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
  " ": ["░", "░", "░"];
  ":": ["#", "░", "#"];
  "*": ["░", "#", "░"];
};

type GetLetter<
  Char extends keyof Letters,
  Index extends number
> = Letters[Uppercase<Char>][Index];

type TransformRow<
  Text extends string,
  Index extends number,
  Acc extends string = ""
> = Text extends `${infer Head extends
  | keyof Letters
  | Lowercase<keyof Letters>}${infer Rest}`
  ? TransformRow<Rest, Index, `${Acc}${GetLetter<Uppercase<Head>, Index>}`>
  : Acc;

type ExpandRow<Text extends string> = [
  TransformRow<Text, 0>,
  TransformRow<Text, 1>,
  TransformRow<Text, 2>
];

type ToAsciiArt<
  Text extends string,
  Acc extends string[] = []
> = Text extends `${infer Row}\n${infer Rest}`
  ? ToAsciiArt<Rest, [...Acc, ...ExpandRow<Row>]>
  : [...Acc, ...ExpandRow<Text>];
