import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const InteractiveChart = () => {
  const chartRef = useRef(null);
  let data = [
    [15, 0],
    [-50, 10],
    [-56.5, 20],
    [-46.5, 30],
    [-22.1, 40]
  ];

  useEffect(() => {
    let myChart = null;
    
    const initializeChart = () => {

      myChart = echarts.init(chartRef.current);
      //myChart.setOption(option)
      
      myChart.setOption({
        xAxis: { min: -100, max: 80, type: 'value', axisLine: { onZero: false } },
        yAxis: { min: -30, max: 60, type: 'value', axisLine: { onZero: false } },
        series: [
          { id: 'a', type: 'line', smooth: true, symbolSize: 20, data: data }
        ],
      });

      myChart.setOption({
        graphic: data.map((item, dataIndex) => ({
          type: 'circle',
          position: myChart.convertToPixel('grid', item),
          shape: { r: 10 },
          invisible: true,
          draggable: true,
          ondrag: onPointDragging.bind(null, dataIndex),
          z: 100
        }))
      });

      const resizeHandler = () => {
        myChart.setOption({
          graphic: data.map((item) => ({
            position: myChart.convertToPixel('grid', item)
          }))
        });
      };

      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
        if (myChart != null) {
          myChart.dispose();
          myChart = null;
        }
      };
    };
    
    const onPointDragging = (dataIndex, event) => {
      if (!myChart) return;

      const [x, y] = myChart.convertFromPixel('grid', [event.offsetX, event.offsetY]);
      console.log(event.offsetX,event.offsetY);
      const newData = [...data];
      newData[dataIndex] = [x, y];

      data=newData;

      myChart.setOption({
        series: [{ id: 'a', data: newData }]
      });
    };
    
    initializeChart();
    
    return () => {
      if (myChart) {
        myChart.dispose();
        myChart = null;
      }
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '600px', height: '400px' }} />;
};

export default InteractiveChart;
