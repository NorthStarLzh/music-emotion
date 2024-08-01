import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const EmotionChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let chartInstance = echarts.init(chartRef.current);
        let data = [];
        let startR = 208;
        let startG = 171;
        let startB = 191;

        let endR = 148;
        let endG = 112;
        let endB = 220;

        for (let i = 0; i < 60; i++) {
            // 计算当前点在渐变中的位置（0到1之间）
            let t = i / 59;

            // 计算当前点的RGB值
            let currentR = Math.round(startR * (1 - t) + endR * t);
            let currentG = Math.round(startG * (1 - t) + endG * t);
            let currentB = Math.round(startB * (1 - t) + endB * t);

            // 将RGB值转换成CSS颜色格式
            let color = `rgb(${currentR}, ${currentG}, ${currentB})`;
                data.push({
                    name: `Point ${i}`,
                    value: [Math.random() * 2 - 1, Math.random() * 2 - 1], // 数据控制在 -1 到 1 之间
                    itemStyle: {
                        color: color // 根据索引设置颜色
                    },
                    animation: true, // 添加动画属性
                    animationDuration: (i + 1) * 500 // 设置每个点的动画时长
                });
            }

            chartInstance.setOption({
                xAxis: {
                    min: -1,
                    max: 1
                },
                yAxis: {
                    min: -1,
                    max: 1
                },
                series: [{
                    type: 'scatter',
                    data: data,
                    symbolSize: 10,
                    animationDelay: function (idx) {
                        return idx * 20; // 设置每个点的动画延迟
                    }
                }]
            });

            return () => chartInstance.dispose();
        }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default EmotionChart;