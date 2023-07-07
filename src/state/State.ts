import { BallState } from "./BallReducer";
import { PlayerState } from "./PlayerReducer";
import { RouteState } from "./RouteReducer";

export default interface State {
  playerState: PlayerState,
  routeState: RouteState,
  ballState: BallState
}