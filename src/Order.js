import React, { useState, useEffect } from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import MusicPlayer from './music-player.jsx';
import { Typography,Button } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // 使用HTML5后端
import LineChart from './LineChart';
import EmotionChart from './EmotionChart';

const { Title, p } = Typography;

const chartTypes = [1, 2, 3]; // 用于表示三个 LineChart 的标识

const OrderPage = () => {
    const [chartsOrder, setChartsOrder] = useState([1, 2, 3]); // 初始顺序为 [1, 2, 3]
    const [activeChartIndex, setActiveChartIndex] = useState(null);

    // 处理图表的拖拽排序
    const handleChartDrop = (dragIndex, hoverIndex) => {
        const newOrder = [...chartsOrder];
        const draggedType = newOrder[dragIndex];

        newOrder.splice(dragIndex, 1); // 删除拖拽的元素
        newOrder.splice(hoverIndex, 0, draggedType); // 在悬停的位置插入拖拽的元素

        setChartsOrder(newOrder);
    };

    // 渲染每个 LineChart
    const RenderChart = ({ chartType, index }) => {
        const isHovering = activeChartIndex === index;

        // 拖拽相关的处理逻辑
        const [{ isDragging }, drag] = useDrag({
            type: 'CHART',
            item: { index },
            collect: monitor => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: 'CHART',
            hover(item, monitor) {
                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return;
                }

                handleChartDrop(dragIndex, hoverIndex);
                item.index = hoverIndex;
            },
        });
        
        return (
            <div
                ref={(node) => drag(drop(node))}
                onMouseEnter={() => setActiveChartIndex(index)}
                onMouseLeave={() => setActiveChartIndex(null)}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    flex: '1',
                    marginBottom: '0px', // 间距
                    position: 'relative', // Add relative positioning
                    height: '400px', // 设置高度
                }}
                key={chartType}
            >
                <LineChart  style={{flex:1, height:'200px'}}/>
                {isHovering && (
                     <div style={{ position: 'absolute', left: 2, top: 0, width: '100%', height: '500px',backgroundColor:'#191d22',borderRadius:'10px' }}>
                     <EmotionChart style={{ width: '100%', height: '100%' }} />
                 </div>
                )}
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='left-part'>
            <Title level={1} style={{ color: 'white' }}>情感曲线排序</Title>
                <p>在该部分您需要首先听完该音乐片段，之后请根据您的实际情况调整下方的情感曲线。</p>
                <MusicPlayer src="music.mp3" />
                <p>请通过拖动的方法进行排序，将您认为最契合您实际情况的图像放在最前面。</p>
                <div style={{ display: 'flex'}}>
                    {chartsOrder.map((chartType, index) => (
                        <RenderChart chartType={chartType} index={index} key={index}/>
                    ))}
                </div>
                <div className='line'></div>
                <p>契合度</p>
                <Link to="/endPage" style={{ textDecoration: 'none' }}>
                    <Button className="nextpage" type="primary" style={{ color: 'white',marginTop:'0px' }}>下一页</Button>
                </Link>
            </div>
        </DndProvider>
    );
};

export default OrderPage;
