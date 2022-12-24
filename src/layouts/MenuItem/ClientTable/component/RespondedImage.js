import { Stage, Layer, Rect } from "react-konva";
import classNames from "classnames/bind";
import styles from "./DrawImage.module.scss";
const cx = classNames.bind(styles);

function RespondedImage({ annotationsToDraw }) {
  return (
    <>
      <div className={cx("wraperDraw")}>
        <Stage width={500} height={600}>
          <Layer>
            {annotationsToDraw[0].data.map((value, index) => {
              return (
                <Rect
                  key={index}
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.height}
                  fill="transparent"
                  stroke="green"
                ></Rect>
              );
            })}
          </Layer>
        </Stage>
      </div>
    </>
  );
}

export default RespondedImage;
