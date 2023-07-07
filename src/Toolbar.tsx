import React, { CSSProperties } from "react"
import defaultRouteColors from "./utils/defaultRouteColors";
import { LineType } from "./utils/lineType";

const solidLineUrl = process.env.PUBLIC_URL + "/solid_line.png";
const dashedLineUrl = process.env.PUBLIC_URL + "/dashed_line.png";

const style: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  bottom: "2%",
  right: "50%",
  transform: "translateX(50%)",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  height: "30px",
  borderRadius: "10px",
  padding: "5px 15px 5px 15px",
  gap: "10px",
  zIndex: "1"
};

const changeColorButtonStyle: CSSProperties = {
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  cursor: "pointer"
}

const changeLineTypeButtonStyle: CSSProperties = {
  width: "15px",
  height: "15px",
  cursor: "pointer",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}

interface ToolbarProps {
  onChangeColorIndex?: (color: number) => void;
  onLineTypeChange?: (type: LineType) => void;
}

export default function Toolbar(props: ToolbarProps) {
  const [colorIndex, setColorIndex] = React.useState<number>(0);
  const [lineType, setLineType] = React.useState<string>("dashed");

  return (
    <div style={style} onClick={e => e.stopPropagation()}>
      <div style={{ ...changeColorButtonStyle, backgroundColor: defaultRouteColors[colorIndex] }} onClick={() => {
        const newColorIndex = defaultRouteColors[colorIndex + 1] ? colorIndex + 1 : 0;
        setColorIndex(newColorIndex);
        if (props.onChangeColorIndex) props.onChangeColorIndex(newColorIndex);
      }}></div>
      <div style={{ ...changeLineTypeButtonStyle,
        backgroundImage: `url("${lineType === "dashed" ? dashedLineUrl : solidLineUrl}")` }}
        onClick={() => {
          const newType = lineType === "dashed" ? "solid" : "dashed";
          setLineType(newType);
          if (props.onLineTypeChange) props.onLineTypeChange(newType);
        }}></div>
    </div>
  );
}