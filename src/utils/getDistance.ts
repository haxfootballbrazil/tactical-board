import { Vector2d } from "konva/lib/types";

export default function getDistance(v1: Vector2d, v2: Vector2d) {
    const a = v1.x - v2.x;
    const b = v1.y - v2.y;

    return Math.sqrt(a * a + b * b);
}