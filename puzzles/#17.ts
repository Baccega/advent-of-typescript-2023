type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

type PlayedRock<Opponent extends RockPaperScissors> = Opponent extends "🖐🏾"
  ? "lose"
  : Opponent extends "✌🏽"
  ? "win"
  : "draw";

type PlayedScissor<Opponent extends RockPaperScissors> = Opponent extends "🖐🏾"
  ? "win"
  : Opponent extends "✌🏽"
  ? "draw"
  : "lose";

type PlayedPaper<Opponent extends RockPaperScissors> = Opponent extends "🖐🏾"
  ? "draw"
  : Opponent extends "✌🏽"
  ? "lose"
  : "win";

type WhoWins<
  Opponent extends RockPaperScissors,
  Player extends RockPaperScissors
> = Player extends "🖐🏾"
  ? PlayedPaper<Opponent>
  : Player extends "✌🏽"
  ? PlayedScissor<Opponent>
  : PlayedRock<Opponent>;
