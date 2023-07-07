import { Stage, Layer, Line } from 'react-konva';
import Player from './Player';
import Ball from './Ball';
import Background from './Background';
import React from 'react';
import { Stage as StageT } from 'konva/lib/Stage';
import setCursor from './utils/setCursor';
import getDistance from './utils/getDistance';
import { useAppDispatch, useAppSelector } from './state/Hooks';
import { changePlayerDesc, clonePlayer, movePlayer, removePlayer, setPlayerInEditMode } from './state/PlayerReducer';
import { addRoute, RouteObject } from './state/RouteReducer';
import { moveBall } from './state/BallReducer';
import { ActionCreators } from 'redux-undo';
import Routes from './Routes';
import { LineType } from './utils/lineType';

interface CanvasProps {
  routeColorIndex: number;
  lineType: LineType;
}

function Canvas(props: CanvasProps) {
  const backgroundWidth = 1240;
  const backgroundHeight = 540;

  const players = useAppSelector((state) => state.present.players.players);
  const playerInEditModeId = useAppSelector((state) => state.present.players.playerInEditModeId);
  const ball = useAppSelector((state) => state.present.ball);

  const dispatch = useAppDispatch();

  const [text, setText] = React.useState<string>("");
  const [canvasWidth, setCanvasWidth] = React.useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = React.useState<number>(window.innerHeight);
  const [activeRoute, setActiveRoute] = React.useState<RouteObject | null>();

  const stageRef = React.useRef<StageT>(null);

  React.useEffect(() => {
    if (stageRef.current) {
      const layer = stageRef.current.getLayers()[0];

      if (layer) {
        layer.getCanvas()._canvas.oncontextmenu = function(e) {
          e.preventDefault();
        };
      }
    }
  }, []);

  React.useLayoutEffect(() => {
    const updateSize = () => {
      setCanvasWidth(window.innerWidth);
      setCanvasHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getOffsetX = () => -canvasWidth / 2;
  const getOffsetY = () => -canvasHeight / 2;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 90 && e.ctrlKey) {
      dispatch(ActionCreators.undo());
      return;
    } else if(e.keyCode === 89 && e.ctrlKey) {
      dispatch(ActionCreators.redo());
      return;
    }

    let desc = text;

    if (playerInEditModeId) {
      if (e.key === "Escape") {
        desc = "";
      } else if (e.key === "Backspace") {
        desc = text.slice(0, -1);
      } else if (e.key.length === 1) {
        desc = text + e.key;
      }

      dispatch(changePlayerDesc({ id: playerInEditModeId, desc }));
      setText(desc);
    }
  };

  return (
    <div tabIndex={1} onKeyDown={((e) => handleKeyDown(e))}>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        offsetY={getOffsetY()}
        offsetX={getOffsetX()}
        style={{ backgroundColor: "#788c5c" }}
        onMouseDown={(e => {
          dispatch(setPlayerInEditMode(0));

          if (e.evt.button !== 0 || playerInEditModeId) return;

          setActiveRoute({
            id: 0,
            v: [
              { x: e.evt.x + getOffsetX(), y: e.evt.y + getOffsetY() },
            ],
            type: props.lineType ?? "dashed",
            colorIndex: props.routeColorIndex,
            shape: e.evt.shiftKey ? "straight" : "curve"
          });
        })}
        onMouseMove={e => {
          if (activeRoute) {
            if (activeRoute.shape === "curve") {
              setActiveRoute({
                ...activeRoute,
                v: activeRoute.v.concat({ x: e.evt.x + getOffsetX(), y: e.evt.y + getOffsetY() })
              });
            } else {
              setActiveRoute({
                ...activeRoute,
                v: activeRoute.v.slice(0, 1).concat({ x: e.evt.x + getOffsetX(), y: e.evt.y + getOffsetY() })
              });
            }
          }
        }}
        onMouseUp={e => {
          if (activeRoute) {
            if (activeRoute.v.length > 1 && (activeRoute.v.length > 2 || getDistance(activeRoute.v[0], activeRoute.v[1]) > 10)) {
              dispatch(addRoute(activeRoute));
              setActiveRoute(null);
            }
          }
        }}
      >
        <Layer>
          <Background x={0} y={0} height={backgroundHeight} width={backgroundWidth} />

          <Line points={[0, -270, 0, 270]} stroke={"#acde97"} strokeWidth={4} />

          <Line points={[-309, -270, -309, 270]} stroke={"#ffa404"} strokeWidth={4} draggable
            dragBoundFunc={(pos) => { return { x: pos.x, y: 376 } }}
            onMouseDown={e => { e.cancelBubble = true; }}
            onMouseOver={e => { setCursor(e, "ew-resize"); }}
            onMouseLeave={e => { setCursor(e, "default"); }}
          />

          <Routes activeRoute={activeRoute} />

          {players.map(p =>
            <Player x={p.x}
              y={p.y}
              team={p.team}
              text={p.avatar}
              desc={p.desc}
              editMode={playerInEditModeId === p.id}
              setEditMode={() => {
                dispatch(setPlayerInEditMode(p.id));
                setText(p.desc ?? "");
              }}
              onClone={e => {
                dispatch(clonePlayer({ id: p.id, pos: { x: e.evt.x + getOffsetX(), y: e.evt.y + getOffsetY() }}))
              }}
              onRemove={e => {
                dispatch(removePlayer(p.id));
                setCursor(e, "default");
              }}
              onDragEnd={e => {
                dispatch(movePlayer({ id: p.id, pos: { x: e.evt.x + getOffsetX(), y: e.evt.y + getOffsetY() } }));
              }}
            />
          )}

          <Ball x={ball.position.x} y={ball.position.y} onDragEnd={
            e => dispatch(moveBall({ x: e.evt.x + getOffsetX(), y: e.evt.y + getOffsetY() }))} />
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
