import { Circle, Group, Text } from 'react-konva';
import setCursor from './utils/setCursor';
import { KonvaEventObject } from 'konva/lib/Node';

interface PlayerProps {
  x: number;
  y: number;
  team: "red" | "blue";
  text?: string;
  desc?: string;
  editMode?: boolean;
  setEditMode?: () => void;
  onClone?: (e: KonvaEventObject<MouseEvent>) => void;
  onRemove?: (e: KonvaEventObject<PointerEvent>) => void;
  onDragEnd?: (e: KonvaEventObject<DragEvent>) => void;
}

function Player(props: PlayerProps) {
  const defaultRadius = 15;
  const textWidth = 25;
  const fontSize = 15;

  return (
    <Group
      x={props.x}
      y={props.y}
      onMouseDown={e => {
        e.cancelBubble = true;
        if (props.setEditMode) props.setEditMode();
        if (e.evt.button === 1 && props.onClone) props.onClone(e);
      }}
      onContextMenu={ e => props.onRemove && props.onRemove(e) }
      onMouseOver={ e => { setCursor(e, "pointer"); }}
      onMouseLeave={ e => { setCursor(e, "default"); }}
      onDragEnd={ e => props.onDragEnd && props.onDragEnd(e) }
      draggable
    >
      <Circle
        radius={defaultRadius}
        stroke={"black"}
        strokeWidth={2}
        fill={props.team === "red" ? "#e86c54" : "#588ce4"}
        shadowColor={"gold"}
        shadowBlur={props.editMode ? 5 : 0}
      />
      <Text
        text={props.text}
        align={"center"}
        verticalAlign={"middle"}
        fill={"white"}
        fontStyle={"900"}
        fontSize={fontSize}
        width={textWidth}
        x={-textWidth / 2}
        y={-textWidth / 4}
      />
      <Text
        text={props.desc}
        align={"center"}
        verticalAlign={"middle"}
        fill={"black"}
        fontStyle={"500"}
        fontSize={fontSize / 1.5}
        width={textWidth * 2}
        x={-textWidth}
        y={textWidth - 5}
      />
    </Group>
  );
}

export default Player;