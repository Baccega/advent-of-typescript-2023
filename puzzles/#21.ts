type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type GetIndexFromPosition<
  Pos extends TicTacToeYPositions | TicTacToeXPositions
> = Pos extends "top"
  ? 0
  : Pos extends "left"
  ? 0
  : Pos extends "middle"
  ? 1
  : Pos extends "center"
  ? 1
  : Pos extends "right"
  ? 2
  : Pos extends "bottom"
  ? 2
  : 0;

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type CheckState<
  Board extends TicTactToeBoard,
  CurrentState extends TicTacToeChip,
  PreviousBoard extends TicTactToeBoard
> = CheckInvalid<Board, PreviousBoard> extends true
  ? CurrentState
  : CheckWin<Board, "❌"> extends true
  ? "❌ Won"
  : CheckWin<Board, "⭕"> extends true
  ? "⭕ Won"
  : CheckDraw<Board> extends true
  ? "Draw"
  : CurrentState extends "❌"
  ? "⭕"
  : "❌";

type AllLines<Board extends TicTactToeBoard> =
  | (0 | 1 | 2 extends infer Line
      ? Line extends number
        ?
            | [Board[0][Line], Board[1][Line], Board[2][Line]]
            | [Board[Line][0], Board[Line][1], Board[Line][2]]
        : never
      : never)
  | [Board[0][0], Board[1][1], Board[2][2]]
  | [Board[0][2], Board[1][1], Board[2][0]];

// Credits to @phry for this type
type CheckWin<Board extends TicTactToeBoard, Player extends TicTacToeChip> = [
  Player,
  Player,
  Player
] extends AllLines<Board>
  ? true
  : false;

type CheckDraw<Board extends TicTactToeBoard> = Board extends TicTacToeChip[][]
  ? true
  : false;
type CheckInvalid<
  Board extends TicTactToeBoard,
  PreviousBoard extends TicTactToeBoard
> = PreviousBoard extends Board ? true : false;

type PlayMove<
  Board extends TicTactToeBoard,
  Move extends string,
  Player extends TicTacToeChip,
  Acc extends TicTactToeBoard = []
> = Acc["length"] extends Board["length"]
  ? Acc
  : Move extends `${infer TicTacToeYPosition extends TicTacToeYPositions}-${infer TicTacToeXPosition extends TicTacToeXPositions}`
  ? Acc["length"] extends GetIndexFromPosition<TicTacToeYPosition>
    ? PlayMove<
        Board,
        Move,
        Player,
        [...Acc, PlayMoveColumn<Board[Acc["length"]], Move, Player>]
      >
    : PlayMove<Board, Move, Player, [...Acc, Board[Acc["length"]]]>
  : never;

type PlayMoveColumn<
  Row extends TicTacToeCell[],
  Move extends string,
  Player extends TicTacToeChip,
  Acc extends TicTacToeCell[] = []
> = Acc["length"] extends Row["length"]
  ? Acc
  : Move extends `${infer TicTacToeYPosition extends TicTacToeYPositions}-${infer TicTacToeXPosition extends TicTacToeXPositions}`
  ? Acc["length"] extends GetIndexFromPosition<TicTacToeXPosition>
    ? Row[Acc["length"]] extends "  "
      ? PlayMoveColumn<Row, Move, Player, [...Acc, Player]>
      : PlayMoveColumn<Row, Move, Player, [...Acc, Row[Acc["length"]]]>
    : PlayMoveColumn<Row, Move, Player, [...Acc, Row[Acc["length"]]]>
  : never;

type TicTacToe<
  Game extends TicTacToeGame,
  Move extends string
> = Game["state"] extends TicTacToeChip
  ? {
      board: PlayMove<Game["board"], Move, Game["state"]>;
      state: CheckState<
        PlayMove<Game["board"], Move, Game["state"]>,
        Game["state"],
        Game["board"]
      >;
    }
  : Game;
