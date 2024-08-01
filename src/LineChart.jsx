import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  let data1 = [-0.8503272320213386, -0.6380446720001525, 0.4944008853506061, 0.7388597143708369, 0.11531167882058391, -0.36389421650728027, -0.9221560569065594, 0.8156530011592968, -0.048099325654584524, -0.5882490545583239, -0.9677386045524268, -0.9175375514025659, -0.7086886503535377, -0.8427148826538899, 0.11053233470977708, -0.8022844100414261, 0.9469085461936178, 0.36988026953219677, -0.7056434143417247, -0.8906291694947996, 0.399978038022651, 0.22185533408364777, -0.502062223505342, 0.024799722834092375, -0.6156781238540128, -0.005177115286519873, 0.994932349857863, 0.9911526047634789, 0.4707536992571977, -0.8977151927389364, 0.3836026706175315, -0.9800632682302983, -0.3742766643188429, -0.6472097273670929, 0.5544154671889128, -0.1355923541687536, 0.8583347276841853, 0.02300960584530909, -0.41172489361268316, -0.34888956189425424, -0.31187584560347337, 0.457658789311739, -0.21875260839958122, -0.8163475729627503, -0.8730659035174066, -0.39279298166547494, 0.8637675827396096, -0.18888439737160123, -0.9112018731421316, 0.25332717565843055, 0.871942761061147, 0.23196192342322797, -0.8417379732759527, 0.3062508123804575, 0.7596209665476112, -0.6835624779622735, 0.4452222254148164, 0.171478385508415, -0.7667422128153949, -0.3991617550669284];
  let data2 = [0.982468537557615, -0.549035497097262, -0.5711677478060748, -0.20406828499029817, -0.1874379635149368, 0.6276648012455401, -0.20461115972208832, -0.8116821240978609, -0.1834909130229445, -0.9335706533981558, -0.67282237137876, 0.18417241789766026, 0.5284946206291952, -0.7824551226635681, -0.18443701939535817, -0.6567389052232202, 0.2762924245196283, 0.6564611940862382, -0.1520340089854575, -0.11338761473329106, 0.8392327695205131, 0.605418211447613, -0.67882674237901, -0.0871457463885077, 0.06582307604537485, 0.15539525494241602, -0.24709541407758118, 0.6274796169643546, 0.4810571784837572, 0.5404826885378811, 0.9690458979550514, -0.21174488741432818, 0.9341488920474486, -0.1957336933375895, 0.7421602635284799, -0.4329744256330832, 0.5230477362724191, 0.02770203529110038, 0.2361602445845996, -0.1918452436128142, 0.21193229151031878, 0.22957574168752393, 0.20432144212956072, 0.7401077847307194, 0.7564253639166127, -0.6275483918246008, -0.3384946001442335, 0.6921168757935592, 0.1386848330505699, -0.03145890987151101, -0.9314895280499305, 0.6790715466774759, 0.15153278506488754, 0.39014296152954553, -0.6711635480695644, -0.36531240209443605, -0.9234147000086921, -0.03202448879150621, 0.11022850378446969, 0.5332016198674332];

  let [chartData1, setChartData1] = useState(data1);
  let [chartData2, setChartData2] = useState(data2);

  useEffect(() => {
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    initChart();

    updateChart();
    // Clean up
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [chartData1, chartData2]);

  const initChart = () => {
    chartInstance.current.setOption({
      xAxis: {
        type: 'category',
        data: generateTimeAxis(),
      },
      yAxis: {
        type: 'value',
        min: -1,
        max: 1,
      },
      legend: {
        data: ['Line 1', 'Line 2'],
      },
      series: [
        {
          id: 'a',
          name: 'Line 1',
          type: 'line',
          smooth: true,
          data: chartData1.map((value) => ({ value })),
          showSymbol: true,
          animationDuration: 0,
        },
        {
          name: 'Line 2',
          type: 'line',
          smooth: true,
          data: chartData2.map((value) => ({ value })),
          showSymbol: true,
          animationDuration: 0,
        },
      ],
    });
  };

  const updateChart = () => {
    if (chartInstance.current) {
      chartInstance.current.setOption({
        xAxis: {
          type: 'category',
          data: generateTimeAxis(),
        },
        yAxis: {
          type: 'value',
          min: -1,
          max: 1,
        },
        legend: {
          data: ['Line 1', 'Line 2'],
        },
        series: [
          {
            name: 'Line 1',
            type: 'line',
            smooth: true,
            data: chartData1.map((value) => ({ value })),
            showSymbol: true,
            animationDuration: 0,
          },
          {
            name: 'Line 2',
            type: 'line',
            smooth: true,
            data: chartData2.map((value) => ({ value })),
            showSymbol: true,
            animationDuration: 0,
          },
        ],
        graphic: [
          ...chartData1.map((item, dataIndex) => ({
            type: 'circle',
            position: chartInstance.current.convertToPixel('grid', [dataIndex, item]),
            shape: { r: 10 },
            invisible: true,
            draggable: true,
            ondrag: (event) => onPointDragging(dataIndex, event, 1),
            z: 100,
          })),
          ...chartData2.map((item, dataIndex) => ({
            type: 'circle',
            position: chartInstance.current.convertToPixel('grid', [dataIndex, item]),
            shape: { r: 10 },
            invisible: true,
            draggable: true,
            ondrag: (event) => onPointDragging(dataIndex, event, 2),
            z: 100,
          })),
        ],
      });
    }

    const resizeHandler = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (chartInstance.current != null) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  };

  const onPointDragging = (dataIndex, event, flag) => {
    if (!chartInstance.current) return;

    // 假设 minY 和 maxY 是你坐标系的最小和最大值
    const minY = 330;  // 你的坐标系最小值
    const maxY = 60; // 你的坐标系最大值

    let y = chartInstance.current.convertFromPixel('grid', event.offsetY);
    console.log(event.offsetY);

    // 计算比例
    const ratio = (event.offsetY - minY) / (maxY - minY);

    // 映射到 -1 到 1 的范围
    const mappedValue = -1 + ratio * 2;

    if (flag === 1) {
      let newData1 = [...chartData1];
      newData1[dataIndex] = mappedValue;
      chartData1=newData1;
      //setChartData1(newData1);
    } else {
      let newData2 = [...chartData2];
      newData2[dataIndex] = mappedValue;
      //setChartData2(newData2);
      chartData2=newData2;
    }
    
    updateChart();
}


  function generateTimeAxis() {
    let timeAxis = [];
    for (let i = 0; i < 60; i++) {
      timeAxis.push(`${i * 0.5}s`);
    }
    return timeAxis;
  }

  return (
    <div style={{ width: 'auto', height: '400px' }}>
      <div
        ref={chartRef}
        style={{
          width: '100%',
          height: '100%',
          paddingTop: '30px',
          paddingBottom: '30px',
          border: '2px solid',
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

export default LineChart;