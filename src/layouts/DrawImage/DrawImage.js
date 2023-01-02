import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { Button, Image } from "antd";

import classNames from "classnames/bind";
import styles from "./DrawImage.module.scss";
const cx = classNames.bind(styles);

const DrawImage = ({ children, modalFeedBack, listBoundingBox }) => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);

  const handleMouseDown = (event) => {
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

  const removeBbox = () => {
    setAnnotations([]);
    setNewAnnotation([]);
  };

  useEffect(() => {
    setAnnotations([]);
    setNewAnnotation([]);
  }, [modalFeedBack]);

  const annotationsToDraw = [...annotations, ...newAnnotation];
  console.log(annotations)
  useEffect(()=>{
    listBoundingBox(annotationsToDraw)
  },[annotationsToDraw])

  return (
    <>
      {/*  style={{ "position: absolute, left: 0, top: 0, z-index: 0 }} */}
      <div className={cx("wraperImage")}>{children}</div>
      <Button type={"primary"} danger onClick={removeBbox}>
        Xóa
      </Button>

      <div className={cx("wraperDraw")}>
        <Stage
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          width={500}
          height={600}
        >
          <Layer>
            {annotationsToDraw.map((value,index) => {
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
};

export default DrawImage;
