import { Circle } from 'react-konva';
import setCursor from './utils/setCursor';
import Konva from 'konva';
import React from 'react';

interface BallProps {
  x: number;
  y: number;
  onDragEnd?: (e: { x: number, y: number }) => void;
}

function Ball(props: BallProps) {
  const ball = React.useRef<Konva.Circle>(null);

  return (
    <Circle
      ref={ball}
      x={props.x}
      y={props.y}
      radius={7.125}
      stroke={"black"}
      strokeWidth={2}
      fill={"#631515"}
      onMouseDown={e => { e.cancelBubble = true; }}
      onMouseOver={e => { setCursor(e, "pointer"); }}
      onMouseLeave={e => { setCursor(e, "default"); }}
      onDragEnd={ () => props.onDragEnd && props.onDragEnd(ball.current!.position())}
      draggable
    />
  );
}

export default Ball;
