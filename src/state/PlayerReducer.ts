import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Vector2d } from "konva/lib/types";
import getParameter from "../utils/getParameter";

export type PlayerObject = {
  id: number;
  x: number;
  y: number;
  team: "red" | "blue";
  avatar: string;
  desc?: string;
};

export interface PlayerState {
  players: PlayerObject[];
  playerInEditModeId: number;
  playerLastId: number;
}

const initialState: PlayerState = getParameter("players") ?? {
  players: [
    { id: 1, x: -25, y: -90, team: "red", avatar: "CB", desc: "CB Cima" },
    { id: 2, x: -25, y: 90, team: "red", avatar: "CB", desc: "CB Baixo" },
    { id: 3, x: -160, y: 35, team: "red", avatar: "LB", desc: "LB Baixo" },
    { id: 4, x: -160, y: -35, team: "red", avatar: "LB", desc: "LB Cima" },
    { id: 5, x: 30, y: -200, team: "blue", avatar: "WR", desc: "WR3" },
    { id: 6, x: 30, y: 100, team: "blue", avatar: "WR", desc: "WR1" },
    { id: 7, x: 30, y: 200, team: "blue", avatar: "WR", desc: "WR2" },
    { id: 8, x: 55, y: 0, team: "blue", avatar: "QB", desc: "QB" }
  ],
  playerInEditModeId: 0,
  playerLastId: 9
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    movePlayer(state, action: PayloadAction<{ id: number, pos: Vector2d }>) {
      state.players = state.players.map(p =>
        p.id === action.payload.id ? { ...p, ...action.payload.pos } : p
      );
    },
    removePlayer(state, action: PayloadAction<number>) {
      state.players = state.players.filter(p => p.id !== action.payload);
    },
    changePlayerDesc(state, action: PayloadAction<{ id: number, desc: string }>) {
      state.players = state.players.map(p =>
        p.id === action.payload.id ? { ...p, desc: action.payload.desc } : p
      );
    },
    clonePlayer(state, action: PayloadAction<{ id: number, pos: Vector2d }>) {
      const player = state.players.find(p => p.id === action.payload.id);
      if (player) state.players.push({ ...player, ...action.payload.pos, id: state.playerLastId++ });
    },
    setPlayerInEditMode(state, action: PayloadAction<number>) {
      state.playerInEditModeId = action.payload;
    }
  },
});

export const { movePlayer, removePlayer, changePlayerDesc, clonePlayer, setPlayerInEditMode } = playerSlice.actions;
export default playerSlice.reducer;