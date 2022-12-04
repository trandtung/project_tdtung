import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const PieImage = () => {
    const data = [
      {
        type: '分类一',
        value: 5,
      },
      {
        type: '分类二',
        value: 5,
      },
      {
        type: '分类三',
        value: 0,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
    //   label: {
    //     type: 'outer',
    //     content: '{name} {percentage}',
    //   },
    //   interactions: [
    //     {
    //       type: 'pie-legend-active',
    //     },
    //     {
    //       type: 'element-active',
    //     },
    //   ],
    };
    return <Pie {...config} />;
  };

  export default PieImage;