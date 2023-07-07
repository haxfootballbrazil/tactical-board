import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Vector2d } from "konva/lib/types";

export interface BallState {
  position: Vector2d;
}

const initialState: BallState = {
  position: { x: 31, y: 0 }
};

export const ballSlice = createSlice({
  name: "ball",
  initialState,
  reducers: {
    moveBall(state, action: PayloadAction<Vector2d>) {
      state.position = action.payload;
    },
  },
});

export const { moveBall } = ballSlice.actions;
export default ballSlice.reducer;