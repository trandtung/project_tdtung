import { Stage, Layer, Rect } from "react-konva";
import classNames from "classnames/bind";
import styles from "./DrawImage.module.scss";
const cx = classNames.bind(styles);

function RespondedImage({annotationsToDraw}) {
//   const annotationsToDraw = [
//     { x: 346.4444274902344, y: 71, width: 123, height: 172, key: 1 },
//   ];
console.log(annotationsToDraw)
  return (
    <>
      {/*  style={{ "position: absolute, left: 0, top: 0, z-index: 0 }} */}
      {/* <div className={cx("wraperImage")}>{children}</div> */}
      {/* <Button type={"primary"} danger onClick={removeBbox}>
        Xóa
      </Button> */}

      <div className={cx("wraperDraw")}>
        <Stage
        //   onMouseDown={handleMouseDown}
        //   onMouseUp={handleMouseUp}
        //   onMouseMove={handleMouseMove}
          width={500}
          height={600}
        >
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
