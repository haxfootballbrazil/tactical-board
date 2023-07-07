import { KonvaEventObject } from "konva/lib/Node";

export default function setCursor(e: KonvaEventObject<PointerEvent | MouseEvent>, cursor: string) {
  const container = e.target.getStage()!.container();
  container.style.cursor = cursor;
  e.cancelBubble = true;
}