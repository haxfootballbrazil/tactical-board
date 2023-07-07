import { Arrow, Group } from 'react-konva';
import { useAppDispatch, useAppSelector } from "./state/Hooks";
import { RouteObject, changeRouteColor, removeRoute } from "./state/RouteReducer";
import setCursor from "./utils/setCursor";

const defaultRouteColors: string[] = [
  "#194bd4", /* blue */
  "#fbff00", /* yellow */
  "#e32033", /* red */
  "#016109" /* green */
];

interface RoutesProps {
  activeRoute?: RouteObject | null;
}

export default function Routes(props: RoutesProps) {
  const dispatch = useAppDispatch();

  const routes = useAppSelector((state) => state.present.routes.routes);
    
  const getRoutes = () => {
    const allRoutes = [...routes];
    if (props.activeRoute && props.activeRoute.v.length > 1) allRoutes.push(props.activeRoute);

    return allRoutes.map(r =>
      <Arrow
        points={[...r.v.map(v => [v.x, v.y]).flat()]}
        bezier={r.v.length > 2 ? true : false}
        stroke={defaultRouteColors[r.colorIndex]}
        strokeWidth={3}
        dash={r.type === "dashed" ? [33, 10] : []}
        tension={0}
        lineJoin={"round"}
        lineCap={"round"}
        fill={defaultRouteColors[r.colorIndex]}
        draggable
        onContextMenu={e => {
          if (r.id) {
            setCursor(e, "default");
            dispatch(removeRoute(r.id));
          }
        }}
        onMouseDown={e => { e.cancelBubble = true; }}
        onMouseOver={e => { setCursor(e, "pointer"); }}
        onMouseLeave={e => { setCursor(e, "default"); }}
        onWheel={e => {
          dispatch(changeRouteColor({ id: r.id, colorIndex: e.evt.deltaY > 0 ? 
            Math.min(r.colorIndex + 1, defaultRouteColors.length - 1) :
            Math.max(r.colorIndex - 1, 0)
          }));
        }}
      />
    );
  };

  return (
    <Group>
      {getRoutes()}
    </Group>
  );
}