import { Circle } from 'react-konva';
import setCursor from './utils/setCursor';
import { KonvaEventObject } from 'konva/lib/Node';

interface BallProps {
  x: number;
  y: number;
  onDragEnd?: (e: KonvaEventObject<DragEvent>) => void;
}

function Ball(props: BallProps) {
  return (
    <Circle
      x={props.x}
      y={props.y}
      radius={7.125}
      stroke={"black"}
      strokeWidth={2}
      fill={"#631515"}
      onMouseDown={e => { e.cancelBubble = true; }}
      onMouseOver={e => { setCursor(e, "pointer"); }}
      onMouseLeave={e => { setCursor(e, "default"); }}
      onDragEnd={ e => props.onDragEnd && props.onDragEnd(e) }
      draggable
    />
  );
}

export default Ball;
