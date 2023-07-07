import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Vector2d } from "konva/lib/types";

export type RouteObject = {
  id: number;
  v: Vector2d[];
  type: "dashed" | "solid";
  shape: "curve" | "straight";
  colorIndex: number;
};

export interface RouteState {
  routes: RouteObject[];
  lastRouteId: number;
}

const initialState: RouteState = {
  routes: [],
  lastRouteId: 1
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    moveRoute(state, action: PayloadAction<{ id: number, pos: Vector2d }>) {
      state.routes = state.routes.map(p =>
        p.id === action.payload.id ? { ...p, ...action.payload.pos } : p
      );
    },
    addRoute(state, action: PayloadAction<RouteObject>) {
      state.routes.push({ ...action.payload, id: state.lastRouteId++ });
    },
    removeRoute(state, action: PayloadAction<number>) {
      state.routes = state.routes.filter(p => p.id !== action.payload);
    },
    changeRouteColor(state, action: PayloadAction<{ id: number, colorIndex: number }>) {
      state.routes = state.routes.map(p =>
        p.id === action.payload.id ? { ...p, colorIndex: action.payload.colorIndex } : p
      );
    },
  },
});

export const { moveRoute, removeRoute, changeRouteColor, addRoute } = routeSlice.actions;
export default routeSlice.reducer;