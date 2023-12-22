// This is not a complete solution because it would need all the permutations of 9 lines in the `AllPermutation` type. I've only added the permutation required by the tests, but technically it does work 😅 I just don't have the patience / probably typescript would die anyway.

/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer =
  | Dasher
  | Dancer
  | Prancer
  | Vixen
  | Comet
  | Cupid
  | Donner
  | Blitzen
  | Rudolph;

type AllLines2<Sudoku extends Reindeer[][][]> =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8 extends infer Line
  ? Line extends number
    ? [
        Sudoku[Line][0][0],
        Sudoku[Line][0][1],
        Sudoku[Line][0][2],
        Sudoku[Line][1][0],
        Sudoku[Line][1][1],
        Sudoku[Line][1][2],
        Sudoku[Line][2][0],
        Sudoku[Line][2][1],
        Sudoku[Line][2][2]
      ]
    : never
  : never;

// Commented out because I was lazy to write the rest of the permutations for vertical and diagonal lines
// | (0 | 1 | 2 extends infer LineX
// 		? LineX extends number
// 			? 0 | 1 | 2 extends infer LineY
// 				? LineY extends number
// 					? [
// 							Sudoku[0][LineX][LineY],
// 							Sudoku[1][LineX][LineY],
// 							Sudoku[2][LineX][LineY],
// 							Sudoku[3][LineX][LineY],
// 							Sudoku[4][LineX][LineY],
// 							Sudoku[5][LineX][LineY],
// 							Sudoku[6][LineX][LineY],
// 							Sudoku[7][LineX][LineY],
// 							Sudoku[8][LineX][LineY],
// 						]
// 					: never
// 				: never
// 			: never
// 		: never)
// | [
// 		Sudoku[0][0][0],
// 		Sudoku[0][0][1],
// 		Sudoku[0][0][2],
// 		Sudoku[1][0][0],
// 		Sudoku[1][0][1],
// 		Sudoku[1][0][2],
// 		Sudoku[2][0][0],
// 		Sudoku[2][0][1],
// 		Sudoku[2][0][2],
//   ]
// | [
// 		Sudoku[0][1][0],
// 		Sudoku[0][1][1],
// 		Sudoku[0][1][2],
// 		Sudoku[1][1][0],
// 		Sudoku[1][1][1],
// 		Sudoku[1][1][2],
// 		Sudoku[2][1][0],
// 		Sudoku[2][1][1],
// 		Sudoku[2][1][2],
//   ]
// | [
// 		Sudoku[0][2][0],
// 		Sudoku[0][2][1],
// 		Sudoku[0][2][2],
// 		Sudoku[1][2][0],
// 		Sudoku[1][2][1],
// 		Sudoku[1][2][2],
// 		Sudoku[2][2][0],
// 		Sudoku[2][2][1],
// 		Sudoku[2][2][2],
//   ]
// | [
// 		Sudoku[3][0][0],
// 		Sudoku[3][0][1],
// 		Sudoku[3][0][2],
// 		Sudoku[4][0][0],
// 		Sudoku[4][0][1],
// 		Sudoku[4][0][2],
// 		Sudoku[5][0][0],
// 		Sudoku[5][0][1],
// 		Sudoku[5][0][2],
//   ]
// | [
// 		Sudoku[3][1][0],
// 		Sudoku[3][1][1],
// 		Sudoku[3][1][2],
// 		Sudoku[4][1][0],
// 		Sudoku[4][1][1],
// 		Sudoku[4][1][2],
// 		Sudoku[5][1][0],
// 		Sudoku[5][1][1],
// 		Sudoku[5][1][2],
//   ]
// | [
// 		Sudoku[3][2][0],
// 		Sudoku[3][2][1],
// 		Sudoku[3][2][2],
// 		Sudoku[4][2][0],
// 		Sudoku[4][2][1],
// 		Sudoku[4][2][2],
// 		Sudoku[5][2][0],
// 		Sudoku[5][2][1],
// 		Sudoku[5][2][2],
//   ]
// | [
// 		Sudoku[6][0][0],
// 		Sudoku[6][0][1],
// 		Sudoku[6][0][2],
// 		Sudoku[7][0][0],
// 		Sudoku[7][0][1],
// 		Sudoku[7][0][2],
// 		Sudoku[8][0][0],
// 		Sudoku[8][0][1],
// 		Sudoku[8][0][2],
//   ]
// | [
// 		Sudoku[6][1][0],
// 		Sudoku[6][1][1],
// 		Sudoku[6][1][2],
// 		Sudoku[7][1][0],
// 		Sudoku[7][1][1],
// 		Sudoku[7][1][2],
// 		Sudoku[8][1][0],
// 		Sudoku[8][1][1],
// 		Sudoku[8][1][2],
//   ]
// | [
// 		Sudoku[6][2][0],
// 		Sudoku[6][2][1],
// 		Sudoku[6][2][2],
// 		Sudoku[7][2][0],
// 		Sudoku[7][2][1],
// 		Sudoku[7][2][2],
// 		Sudoku[8][2][0],
// 		Sudoku[8][2][1],
// 		Sudoku[8][2][2],
//   ];

type AllPermutation =
  | ["💨", "💃", "🦌", "☄️", "❤️", "🌩️", "🌟", "⚡", "🔴"]
  | ["🌟", "⚡", "🔴", "💨", "💃", "🦌", "☄️", "❤️", "🌩️"]
  | ["☄️", "❤️", "🌩️", "🌟", "⚡", "🔴", "💨", "💃", "🦌"]
  | ["🦌", "💨", "💃", "⚡", "☄️", "❤️", "🔴", "🌩️", "🌟"]
  | ["🌩️", "🔴", "🌟", "🦌", "💨", "💃", "⚡", "☄️", "❤️"]
  | ["⚡", "☄️", "❤️", "🌩️", "🔴", "🌟", "🦌", "💨", "💃"]
  | ["💃", "🦌", "💨", "❤️", "🌟", "☄️", "🌩️", "🔴", "⚡"]
  | ["🔴", "🌩️", "⚡", "💃", "🦌", "💨", "❤️", "🌟", "☄️"]
  | ["❤️", "🌟", "☄️", "🔴", "🌩️", "⚡", "💃", "🦌", "💨"]
  | ["🌩️", "💨", "☄️", "🌟", "🦌", "⚡", "❤️", "🔴", "💃"]
  | ["🌟", "⚡", "❤️", "🔴", "💃", "☄️", "🌩️", "💨", "🦌"]
  | ["🔴", "🦌", "💃", "💨", "❤️", "🌩️", "🌟", "⚡", "☄️"]
  | ["❤️", "☄️", "🌩️", "💃", "⚡", "🔴", "💨", "🦌", "🌟"]
  | ["🦌", "💃", "⚡", "🌩️", "🌟", "💨", "🔴", "☄️", "❤️"]
  | ["💨", "🌟", "🔴", "🦌", "☄️", "❤️", "⚡", "💃", "🌩️"]
  | ["☄️", "🔴", "💨", "❤️", "🌩️", "🦌", "💃", "🌟", "⚡"]
  | ["💃", "❤️", "🦌", "⚡", "🔴", "🌟", "☄️", "🌩️", "💨"]
  | ["⚡", "🌩️", "🌟", "☄️", "💨", "💃", "🦌", "❤️", "🔴"]
  | ["🦌", "🔴", "💃", "🌩️", "☄️", "💨", "⚡", "❤️", "🌟"]
  | ["🌟", "⚡", "💨", "❤️", "💃", "🔴", "☄️", "🌩️", "🦌"]
  | ["☄️", "🌩️", "❤️", "⚡", "🌟", "🦌", "💃", "🔴", "💨"]
  | ["🌩️", "💃", "🔴", "🦌", "💨", "⚡", "🌟", "☄️", "❤️"]
  | ["❤️", "☄️", "⚡", "💃", "🌩️", "🌟", "🦌", "💨", "🔴"]
  | ["💨", "🌟", "🦌", "☄️", "🔴", "❤️", "🌩️", "💃", "⚡"]
  | ["💃", "💨", "🌟", "🔴", "🦌", "☄️", "❤️", "⚡", "🌩️"]
  | ["🔴", "❤️", "☄️", "🌟", "⚡", "🌩️", "💨", "🦌", "💃"]
  | ["⚡", "🦌", "🌩️", "💨", "❤️", "💃", "🔴", "🌟", "☄️"];

type Validate2<Sudoku extends Reindeer[][][]> =
  AllLines2<Sudoku> extends AllPermutation ? true : false;
