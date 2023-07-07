import { combineReducers, configureStore } from "@reduxjs/toolkit";
import undoable from 'redux-undo';
import PlayerReducer from "./PlayerReducer";
import RouteReducer from "./RouteReducer";
import BallReducer from "./BallReducer";

export const store = configureStore({
  reducer: undoable(combineReducers({
    players: PlayerReducer,
    routes: RouteReducer,
    ball: BallReducer
  }))
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;