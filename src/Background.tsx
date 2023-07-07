import { Image } from 'react-konva';
import useImage from 'use-image';

const bgUrl = process.env.PUBLIC_URL + "/bg.png";

interface BackgroundProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

function Background(props: BackgroundProps) {
  const [image] = useImage(bgUrl);

  const imageWidth = props.width ?? image?.width!;
  const imageHeight = props.height ?? image?.height!;
  const imageOffsetX = imageWidth / 2;
  const imageOffsetY = imageHeight / 2;

  return (
    <Image
      image={image}
      x={props.x}
      y={props.y}
      width={imageWidth}
      height={imageHeight}
      offsetX={imageOffsetX}
      offsetY={imageOffsetY}
      stroke={"white"}
      strokeWidth={2}
    />
  );
}

export default Background;
