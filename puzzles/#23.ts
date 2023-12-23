type Connect4Chips = "🔴" | "🟡";
type Connect4Cell = Connect4Chips | "  ";
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type GameBoard = Connect4Cell[][];

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
];

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type Transpose<T extends unknown[][], U = T["length"] extends 0 ? [] : T[0]> = {
  [X in keyof U]: {
    [Y in keyof T]: X extends keyof T[Y] ? T[Y][X] : never;
  };
};

// My solution was too recursive D:

// type MakeMoveRow<
// 	Row extends Connect4Cell[],
// 	MovePos extends number,
// 	Player extends Connect4Chips,
// 	Played extends boolean,
// 	Acc extends Connect4Cell[] = [],
// > = Played extends true
// 	? Row
// 	: Acc["length"] extends Row["length"]
// 		? Acc
// 		: Acc["length"] extends MovePos
// 			? Row[Acc["length"]] extends "  "
// 				? MakeMoveRow<Row, MovePos, Player, Played, [...Acc, Player]>
// 				: MakeMoveRow<Row, MovePos, Player, Played, [...Acc, Row[Acc["length"]]]>
// 			: MakeMoveRow<Row, MovePos, Player, Played, [...Acc, Row[Acc["length"]]]>;

// type ReverseBoard<
// 	Board extends Connect4Cell[][],
// 	Acc extends Connect4Cell[][] = [],
// > = Acc["length"] extends Board["length"]
// 	? Acc
// 	: ReverseBoard<Board, [Board[Acc["length"]], ...Acc]>;

// type MakeMove<
// 	Board extends Connect4Cell[][],
// 	MovePos extends number,
// 	Player extends Connect4Chips,
// 	Played extends boolean = false,
// 	Acc extends Connect4Cell[][] = [],
// > = Acc["length"] extends Board["length"]
// 	? Acc
// 	: MakeMoveRow<Board[Acc["length"]], MovePos, Player, Played> extends Board[Acc["length"]]
// 		? MakeMove<
// 				Board,
// 				MovePos,
// 				Player,
// 				Played,
// 				[...Acc, MakeMoveRow<Board[Acc["length"]], MovePos, Player, Played>]
// 			>
// 		: MakeMove<
// 				Board,
// 				MovePos,
// 				Player,
// 				true,
// 				[...Acc, MakeMoveRow<Board[Acc["length"]], MovePos, Player, Played>]
// 			>;

// type MakeMoveWrapper<
// 	Board extends Connect4Cell[][],
// 	MovePos extends number,
// 	Player extends Connect4Chips,
// > = ReverseBoard<MakeMove<ReverseBoard<Board>, MovePos, Player>>;

// Solution from https://github.com/Onxi95/type-challenges/blob/main/connect-4.ts

type PlaceChipAtEndIfEmpty<
  Row extends Connect4Cell[],
  Chip extends Connect4Chips
> = Row extends [...infer First, infer Last]
  ? Last extends "  "
    ? [...First, Chip]
    : [...First, Last]
  : never;

type PlaceChipAtEnd<
  Row extends Connect4Cell[],
  Chip extends Connect4Chips,
  Memory extends Connect4Cell[] = []
> = Row extends [
  infer First extends Connect4Cell,
  ...infer Rest extends Connect4Cell[]
]
  ? Rest[0] extends Connect4Chips
    ? [...Memory, Chip, ...Rest]
    : PlaceChipAtEnd<Rest, Chip, [...Memory, First]>
  : PlaceChipAtEndIfEmpty<Memory, Chip>;

type FlipGameState<CurrentState extends Connect4Chips> =
  CurrentState extends "🟡" ? "🔴" : "🟡";

type PlaceChipAtEndTest1 = PlaceChipAtEnd<
  ["  ", "  ", "  ", "  ", "  ", "  "],
  "🟡"
>;
type PlaceChipAtEndTest2 = PlaceChipAtEnd<
  ["  ", "  ", "  ", "🔴", "🟡", "🔴"],
  "🟡"
>;

type FillChipInColumn<
  Board extends GameBoard,
  Column extends number,
  Chip extends Connect4Chips,
  TransposedBoard extends Transpose<Board> = Transpose<Board>,
  Memory extends GameBoard = []
> = Memory["length"] extends TransposedBoard["length"]
  ? Transpose<Memory>
  : Column extends Memory["length"]
  ? FillChipInColumn<
      Board,
      Column,
      Chip,
      TransposedBoard,
      [...Memory, PlaceChipAtEnd<TransposedBoard[Memory["length"]], Chip>]
    >
  : FillChipInColumn<
      Board,
      Column,
      Chip,
      TransposedBoard,
      [...Memory, TransposedBoard[Memory["length"]]]
    >;

type Connect4<
  Game extends { board: Connect4Cell[][]; state: Connect4State },
  MovePos extends number
> = unknown;

type Test = FillChipInColumn<EmptyBoard, 1, "🔴">;
type Test2 = FillChipInColumn<Test, 1, "🔴">;
type Test4 = FillChipInColumn<Test2, 1, "🔴">;
type Test5 = FillChipInColumn<Test4, 1, "🔴">;
