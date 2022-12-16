import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { Image } from "antd";

import classNames from "classnames/bind";
import styles from "./DrawImage.module.scss";
const cx = classNames.bind(styles);

const DrawImage = ({ children }) => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);

  const handleMouseDown = (event) => {
    console.log(event.target);
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];
  console.log(annotationsToDraw);
  return (
    <>
      {/*  style={{ "position: absolute, left: 0, top: 0, z-index: 0 }} */}
      <div className={cx("wraperImage")}>
        <Image
          preview={false}
          src={`http://localhost:6868/static/A%20Gs.Poha%2030T%20-%20R21.jpg`}
          width={500}
          height={600}
          // style={{ position: "absolute", left: "0", top: "0", z-index: "0" }}
        />
      </div>

      <div className={cx("wraperDraw")}>
        <Stage
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          width={500}
          height={600}
        >
          <Layer>
            {annotationsToDraw.map((value) => {
              return (
                <Rect
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
};

export default DrawImage;
