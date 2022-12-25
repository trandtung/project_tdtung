import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";

import { useDispatch } from "react-redux";
import moment from "moment/moment";
import { getNumberClientDay } from "../../../../stores/slice/homeSlice";
import { useRef } from "react";

const DemoColumn = () => {
  const dispatch = useDispatch();
  const dataColumn = useRef([]);
  const data = [];
  // console.log(dataColumn.current)
  // useEffect(() => {
  //   data = dataColumn.current;
  // }, [dataColumn]);
  const config = {
    data:dataColumn.current,
    xField: "type",
    yField: "number",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };

  useEffect(() => {
    fetchDataColumn();
  }, []);
  const fetchDataColumn = async () => {
    for (let i = 1; i <= 8; ++i) {
      const response = await dispatch(
        getNumberClientDay(moment().day(i).format("YYYY-MM-DD"))
      );
      if (getNumberClientDay.fulfilled.match(response)) {
        // console.log(response);
        // data=[...data,response.payload.data]
        dataColumn.current = [...dataColumn.current, response.payload.data];
        // data.push(response.payload.data);
      }
    }
  };
  // console.log(dataColumn.current);
  return <Column {...config} />;
};
export default DemoColumn;
